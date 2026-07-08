const db = require('../db');

exports.getByUsuario = (usuario, callback) =>{

    db.get(
        "SELECT * FROM usuarios WHERE usuario = ?",
        [usuario],
        callback
    );
};