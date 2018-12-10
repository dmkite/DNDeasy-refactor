const model = require('../models/characters')

function getChars(){
    console.log(`===============hitting char controllers=================`)
    const id = req.params.id
    return model.getChars(id)
}
module.exports = {getChars}