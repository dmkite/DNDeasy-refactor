const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/auth')

router.post('/login', ctrl.login)

module.exports = router