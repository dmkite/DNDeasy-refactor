const model = require('../models/auth')
const jwt = require('jsonwebtoken')

// function signup(req, res, next){
//     return checkForUser(req.body)
//     .then(result => {
//         if (!!result) return next({ status: 400, message: `Username ${req.body.username} is already taken` })
//         return model.createOne(req.body)
//         .then(result => {
//             res.status(201).send({data: result})
//         })
//     })
// }

// function checkForUser(obj){
//     const { username, password } = obj
//     if (!username || !password) return next({ status: 400, message: "Either username or password is missing" })
//     return model.getOne(username)
// }

function login(req, res, next){
    const {username, password} = req.body
    if(!username || !password) throw {status:400, message: "Username or password missing"}
    return model.login(username, password)
    .then(user => {
        const token = jwt.sign({id: user.id}, process.env.SECRET )
        return res.status(200).send({token})
    })
    .catch(next)
}



module.exports = {login}