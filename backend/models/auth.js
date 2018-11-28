const db = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10

function getOne(username){
    return db('users')
        .where({username})
        .first()
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

function getChars(id){
    return db('characters')
        .where({user_id: id})
        
}
module.exports = {login, getOne, getChars}