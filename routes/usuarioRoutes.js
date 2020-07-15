const express = require('express'),
    router = express.Router(),
    authCtrl = require('../controllers/usuarioController')

router.post('/', authCtrl.salvar)// POST /usuario/
    
module.exports = router