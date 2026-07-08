const express = require('express');
const session = require('express-session');
const routes = require('./routes/routes');

require('./db');

const app = express();

app.use(express.json());

app.use(session({
    secret: 'secreto123',
    resave: false,
    saveUninitialized: true
}));

// PRIMERO las rutas
app.use('/', routes);

// DESPUÉS los archivos estáticos
app.use(express.static('views'));

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});