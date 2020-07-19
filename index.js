require("dotenv").config();

const
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    db = require('./services/Database'),

    authVerify = require('./middlewares/authVerify'),
    authRoutes = require('./routes/authRoutes'),
    usuarioRoutes = require('./routes/usuarioRoutes'),
    despesasRoutes = require('./routes/despesasRoutes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(authRoutes)// rota de login
app.use(authVerify) // validacao de token
app.use('/usuario', usuarioRoutes)
app.use('/despesas', despesasRoutes)

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});