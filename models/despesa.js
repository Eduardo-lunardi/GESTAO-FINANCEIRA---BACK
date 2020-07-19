const mongoose = require('mongoose')
Schema = mongoose.Schema

let DespesaModel = new Schema({
    valor: { type: String, required: true },
    vencimento: { type: Date, required: true },
    tipo: { type: String, required: true },
    fornecedor: { type: String, required: true },
    pago: { type: String, required: true },
    idUser: { type: String, required: true }
}, { collection: 'despesas', versionKey: false })

module.exports = mongoose.model('Despesas', DespesaModel)