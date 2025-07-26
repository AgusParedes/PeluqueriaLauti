import db from '../../db.js';
import { enviarCorreo } from '../nodemailer.js';

export const obtenerTurnosOcupados = (req, res) => {
  db.all('SELECT fecha, hora FROM Turnos', [], (err, filas) => {
    if (err) {
      console.error("Error en consulta a la DB:", err);
      return res.status(500).json({ error: 'Error al buscar turnos ocupados' });
    }

    res.json(filas); 
  });
};



export const crearTurno = (req, res) => {
  const { nombre, fecha, hora, telefono } = req.body;

  db.run(
  'INSERT INTO Turnos (nombre_cliente, fecha, hora, telefono) VALUES (?, ?, ?, ?)',
  [nombre, fecha, hora, telefono],
  async function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT' || (err.message && err.message.includes('UNIQUE constraint failed'))) {
        return res.status(409).json({ error: 'Ese turno ya fue reservado.' });
      }
      console.error("Error al insertar el turno:", err);
      return res.status(500).json({ error: 'Error al guardar turno' });
    }

    try {
        await enviarCorreo({ nombre, telefono, fecha, hora });
      } catch (error) {
        console.error('Error enviando correo:', error);
      }
    
    res.json({ mensaje: 'Turno reservado con éxito', id: this.lastID });
  }
);
}


