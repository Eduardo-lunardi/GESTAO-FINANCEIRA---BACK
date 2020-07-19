const express = require('express'),
    router = express.Router(),
    despCtrl = require('../controllers/despesasController')

router.post('/cadastro', despCtrl.salvar)
router.get('/mes/:id', despCtrl.getDespMes)
router.get('/tipo/:id', despCtrl.getDespTipo)
router.get('/fornecedor/:id', despCtrl.getDespForn)
router.get('/total/:id', despCtrl.getDespTotalAberto)
router.get('/atual/:id', despCtrl.getDespAtual)

module.exports = router