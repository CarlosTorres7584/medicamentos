const db = require('../db');

exports.obtenerTodos = (callback) => {
    db.all(

        "SELECT * FROM medicamentos",
        [],
        callback
    );
};

exports.agregar = (nombre, cantidad, gramaje, callback) => {
    db.run(
        `INSERT INTO medicamentos (nombre, cantidad, gramaje)
        VALUES (?, ?, ?)`,
        [nombre, cantidad, gramaje],
        callback
    );
};