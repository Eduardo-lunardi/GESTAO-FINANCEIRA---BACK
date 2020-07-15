const Usuario = require('../models/usuario'),
    bcrypt = require('bcrypt'),
    jwt = require("jsonwebtoken")

exports.login = (req, res, next) => {
    let { email, senha } = req.body;
    console.log(email, senha);

    if (!email || !senha) return res.status(401).send('Informe email/senha')

    Usuario.findOne({ email }, (error, usuario) => {
        if (error) return next(error)
        if (!usuario) return res.status(401).send('Usuário senha inválidos')

        //VERIFICA HASH SENHA
        bcrypt.compare(senha, usuario.senha, (err, match) => {
            if (!match) return res.status(401).send('Usuário ou senha inválidos')

            //GERAR TOKEN
            const token = jwt.sign({
                usuario: {
                    _id: usuario._id,
                    roles: usuario.roles
                }
            }, process.env.SECRET_JWT, { expiresIn: '1d' });

            res.json({
                usuario: {
                    _id: usuario._id,
                    nome: usuario.nome,
                    email: usuario.email,
                    roles: usuario.roles
                },
                token
            })
            console.log(usuario);
        })
    })
}
