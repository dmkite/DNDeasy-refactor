const model = require('../models/users')

function create(req, res, next) {
    const {username, password} = req.body
    if(!username || !password) throw {status: 400, message: "username or password missing"}
    model.create(req.body.username, req.body.password)
    .then(function (data) {
        return res.status(201).send({ data })
    })
    .catch(next)
}

module.exports = {
    create
}