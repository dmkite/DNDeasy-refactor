const db = require('../db')
const authMod = require('../models/auth')
const bcrypt = require('bcrypt')

function create(username, password){
    return authMod.getOne(username)
    .then(data =>{
        if(data) throw {status:400, message:'Username taken'}
        return bcrypt.hash(password, 10)
    })
    .then(hashedPW => {
        return db('users')
        .insert({username, password: hashedPW})
        .returning('*')
    })
    .then(([user]) => {
        delete user.password
        return user
    })
}

function getChars(id){
    return db('characters')
        .where('user_id', id)
}

module.exports = {create, getChars}