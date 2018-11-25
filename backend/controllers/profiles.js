const model = require('../models/profiles')

function signup(req, res, next){
    return checkForUser(req.body)
    .then(result => {
        if (!!result) return next({ status: 400, message: `Username ${req.body.username} is already taken` })
        return model.createOne(req.body)
        .then(result => {
            res.status(201).send({data: result})
        })
    })
}

function checkForUser(obj){
    const { username, password } = obj
    if (!username || !password) return next({ status: 400, message: "Either username or password is missing" })
    return model.getOne(username)
}

function login(req, res, next){
    return checkForUser(req.body)
    .then(result => {
        if (!result) return next({ status: 404, message: `Username ${req.body.username} not found`})
        return model.checkPW(req.body)
        .then(result => {
            console.log(result, '99999999999999999999999999999999999')
            if (!result) return next({ status: 400, message: `Incorrect password. As a reminder, passwords must be at least 8 characters long and contain at least one numeral and one special character` })
            res.status(201).send({data: result})
        })
    }) 
}



module.exports = {signup, login}