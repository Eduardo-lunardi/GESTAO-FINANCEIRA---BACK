const Usuario = require('../models/usuario'),
    bcrypt = require('bcrypt')

exports.salvar = (req, res, next) => {
    let u = req.body

    console.log(res.locals.usuario);
    console.log(u);


    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(u.senha, salt, (err, hash) => {
            if (err) return reject(err)
            u.senha = hash

            Usuario.create(u, (error, usuario) => {
                console.log(usuario);

                res.json(usuario)
            })
        });
    });
}