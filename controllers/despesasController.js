const Despesas = require('../models/despesa')

exports.salvar = (req, res, next) => {
    let d = req.body

    console.log(d);

    Despesas.create(d, (error, usuario) => {
        if (error) {
            return res.json(error)
        }
        res.json(usuario)
    })
}

exports.getDespMes = (req, res, next) => {

    Despesas.aggregate([
        {
            $match: {
                idUser: req.params.id,
                vencimento: '$vencimento'
            }
        },
        {
            $group: {
                _id: {
                    mes: { $month: '$vencimento' },
                    ano: { $year: '$vencimento' }
                },
                count: { $sum: 1 }
            }
        },
        {
            $limit: 12
        }
    ]).exec(function (err, total) {
        if (err) {
            return res.json(err)
        }
        console.log(total);

        res.json(total)
    })
}

exports.getDespTipo = (req, res, next) => {
    Despesas.aggregate([
        {
            $match: {
                idUser: req.params.id
            }
        },
        {
            $group: {
                _id: '$tipo',
                count: { $sum: 1 }
            }
        },
    ]).exec(function (err, tipo) {
        if (err) {
            return res.json(err)
        }
        console.log(tipo);

        res.json(tipo)
    })
}

exports.getDespForn = (req, res, next) => {
    console.log(req.params.id);

    Despesas.aggregate([
        {
            $match: {
                idUser: req.params.id
            }
        },
        {
            $group: {
                _id: '$fornecedor',
                count: { $sum: 1 }
            }
        },
    ]).exec(function (err, fornecedor) {
        if (err) {
            return res.json(err)
        }
        console.log(fornecedor);

        res.json(fornecedor)
    })
}

exports.getDespTotalAberto = (req, res, next) => {
    Despesas
        .aggregate([
            {
                $match: { 
                    idUser: req.params.id,
                    pago: "Não",
                }
            },
            {
                $group: {
                    _id: {},
                    count: { $sum: 1 }
                }
            },
        ])
        .exec(function (err, total) {
            if (err) {
                return res.json(err)
            }
            console.log(total);
            
            res.json(total)
        })
}

exports.getDespAtual = (req, res, next) => {
    // Despesas
    //     .aggregate([
    // 
    // {
    //     $match: {
    //         idUser: req.params.id
    //     }
    // },
    // {
    //             $group: {
    //                 _id: {
    //                     mes: '$vencimento',
    //                 },
    //             },
    //         },
    //     ])
    //     .exec(function (err, total) {
    //         if (err) {
    //             return res.json(err)
    //         }
    //         res.json(total)
    //     })
}