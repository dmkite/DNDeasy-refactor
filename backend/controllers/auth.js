const model = require('../models/auth')
const jwt = require('jsonwebtoken')

function login(req, res, next){
    const {username, password} = req.body
    if(!username || !password) throw {status:400, message: "Username or password missing"}
    return model.login(username, password)
    .then(user => {
        const payload = {
            id: user.id,
            exp: (Date.now() / 1000) + 600,
            name: username
        }
        const token = jwt.sign(payload, process.env.SECRET )
        return res.status(200).send({token})
    })
    .catch(next)
}

function authenticate(req, res, next){
    if(!req.headers.authorization) return next({status:401, message: 'Unauthorized'})

    const [, token] = req.headers.authorization.split(' ')
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return next({status: 401, message: err})
        req.claim = payload
        next()
    })
}

function confirmReq(req, res, next){
    if(req.claim.id != req.params.id) next({status:401, message: 'Unauthorized'})
    next()
}

function authStatus(req, res, next){
    res.status(200).send({data: req.claim})
}



module.exports = {login, authenticate, confirmReq, authStatus}