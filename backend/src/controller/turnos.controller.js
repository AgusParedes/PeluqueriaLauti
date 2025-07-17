import db from '../../db.js';


export const obtenerTurnosDisponibles = (req, res) => {
  const horarios = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];
  const hoy = new Date();
  const fechas = [];

  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    const fechaFormateada = fecha.toISOString().split('T')[0]; 
    fechas.push(fechaFormateada);
  }

  db.all('SELECT fecha, hora FROM turnos', [], (err, filas) => {
    if (err) return res.status(500).json({ error: 'Error al buscar turnos' });

    const ocupados = filas.map(f => `${f.fecha}-${f.hora}`);
    const disponibles = [];

    for (const fecha of fechas) {
      for (const hora of horarios) {
        const clave = `${fecha}-${hora}`;
        if (!ocupados.includes(clave)) {
          disponibles.push({ fecha, hora });
        }
      }
    }

    res.json(disponibles);
  });
};


export const crearTurno = (req, res) => {
  const { nombre, fecha, hora } = req.body;

    db.run(
      'INSERT INTO turnos (nombre_cliente, fecha, hora) VALUES (?, ?, ?)',[nombre, fecha, hora],
      function (err) {
        if (err) return res.status(500).json({ error: 'Error al guardar turno' });
        res.json({ mensaje: 'Turno reservado con éxito', id: this.lastID });
      }
    );
};
