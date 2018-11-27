const model = require('../models/users')
const jwt = require('jsonwebtoken')

function create(req, res, next) {
    const {username, password} = req.body
    if(!username || !password) throw {status: 400, message: "username or password missing"}
    model.create(req.body.username, req.body.password)
    .then(function (data) {
        return res.status(201).send({ data })
    })
    .catch(next)
}

function getChars(req, res, next){
    const {token} = req.body
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) throw {status: 400, message: "something went wrong"}
        return model.getChars(decoded.id)
        .then(data => {
            res.status(200).send({data})
        })
        .catch(next)
    })
}
module.exports = { create, getChars }