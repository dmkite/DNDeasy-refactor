const db = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

function getOne(username){
    return db('users')
        .where({username})
        .first()
}

function createOne({username, password}){
    return bcrypt.hash(password, saltRounds)
    .then(result => {
        return db('users')
        .returning('*')
        .insert({username, password: result})
        .then(result => result)
    })
}

function checkPW({username, password}){
    return getOne(username)
    .where({username})
    .first()
    .then(result => {
        return bcrypt.compare(password, result.password)
        .then(result => result)
    })
    }

function login(username, password){
    let user
    return getOne(username)
    .then(data => {
        if(!data) throw {status:400, message:`No user with username ${username}`}
        user = data
        return bcrypt.compare(password, user.password)
    })
    .then(status => {
        if(!status) throw {status:401, message:'unauthorized'}
        delete user.password
        return user
    })
}   
module.exports = {login, getOne}