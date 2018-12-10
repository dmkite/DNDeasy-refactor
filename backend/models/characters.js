const db = require('../db')

function getChars(id){
    return db('characters')
        .where('user_id', id)
}
module.exports = {getChars}