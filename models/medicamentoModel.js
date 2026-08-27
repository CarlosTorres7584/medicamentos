const db = require('../db');


//////FUNCION OBTENER TODOS///////////////
exports.obtenerTodos = (callback) => {
    db.all(

        "SELECT * FROM medicamentos",
        [],
        callback
    );
};

////////FUINCION EXISTE///////////////
exports.existe = (nombre, gramaje, callback) => {
    db.get(
        `SELECT id FROM medicamentos
        WHERE nombre = ? AND gramaje = ?`, 
        [nombre, gramaje],
        callback
    );
};

////////FUNCION AGREGAR//////////////
exports.agregar = (nombre, cantidad, gramaje, callback) => {
    db.run(
        `INSERT INTO medicamentos (nombre, cantidad, gramaje)
        VALUES (?, ?, ?)`,
        [nombre, cantidad, gramaje],
        callback
    );
};

///////FUNCION ELIMINAR/////////////
exports.eliminar = (id, callback) => {
    db.run(
        `DELETE FROM medicamentos WHERE id = ?`,
        [id],
        callback
    );
};