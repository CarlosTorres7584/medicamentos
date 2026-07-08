const db = require('./db');

db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
    console.log('Tablas:', rows);
});