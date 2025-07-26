import db from '../../db.js';

export const loginAdmin = (req, res) => {
  const { usuario, password } = req.body;
  

  db.get(
    'SELECT * FROM Admins WHERE usuario = ? AND password = ?',
    [usuario, password],
    (err, row) => {
      if (err) {
        console.error("Error en login:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (row) {
        res.json({ mensaje: "Login correcto", usuario: row.usuario });
      } else {
        res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
    }
  );
};
