const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./almacen.db');

db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

module.exports = db;

