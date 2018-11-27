const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.post('/', ctrl.create)
router.post('/characters', ctrl.getChars)

module.exports = router