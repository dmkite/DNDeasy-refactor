const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/auth')

router.post('/login', ctrl.login)
router.get('/token', ctrl.authenticate, ctrl.authStatus)
module.exports = router