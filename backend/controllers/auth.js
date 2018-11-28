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
    const [, token] = req.headers.authorization.split(' ')
    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return next({status: 401, message: err})
        console.log(payload)
        req.claim = payload
        
        next()
    })
    

}

function confirmReq(req, res, next){
    if(req.claim.id !== req.params.id) next({status:401, message: 'Unauthorized'})
    next()
}

function authStatus(req, res, next){
    res.status(200).send({data: req.claim})
}

function getChars(req, res, next){
    const id = req.params.id
    return model.getChars(id)

}


module.exports = {login, authenticate, confirmReq, authStatus}