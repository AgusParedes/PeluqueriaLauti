// controllers/adminTurnos.js
import db from '../../db.js';

export const obtenerTurnosReservados = (req, res) => {
  db.all('SELECT * FROM Turnos', [], (err, filas) => {
    if (err) {
      console.error("Error en consulta a la DB:", err);
      return res.status(500).json({ error: 'Error al buscar turnos' });
    }
    res.json(filas);
  });
};

export const borrarTurno = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM Turnos WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'Error al borrar el turno' });
    if (this.changes === 0) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json({ mensaje: 'Turno eliminado con éxito' });
  });
};

export const bloquearTurno = (req, res) => {
  const { nombre, fecha, hora, telefono } = req.body;
  db.run(
    'INSERT INTO Turnos (nombre_cliente, fecha, hora, telefono) VALUES (?, ?, ?, ?)',
    [nombre, fecha, hora, telefono],
    function(err) {
      if (err) return res.status(500).json({ error: 'Error al bloquear turno' });
      res.json({ mensaje: 'Turno bloqueado con éxito', id: this.lastID });
    }
  );
};
