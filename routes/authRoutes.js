const express = require('express'),
    router = express.Router(),
    authCtrl = require('../controllers/authController')

router.post('/login', authCtrl.login)

module.exports = router