import sqlite3 from 'sqlite3';

sqlite3.verbose();

const db = new sqlite3.Database('./PeluqueriaLauti.db', (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

export default db;
