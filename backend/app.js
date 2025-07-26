import turnosRouter from './src/routes/turnos.router.js';
import AdminRouter from './src/routes/adminLogin.router.js';
import AdminPanel from './src/routes/admin.router.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js'; 


dotenv.config(); 


const app = express();
app.use(cors());
app.use(express.json());

db.serialize(() => {
  const usuarioAdmin = process.env.ADMIN_USER ;
  const passwordAdmin = process.env.ADMIN_PASS; 
  db.run(
    `INSERT OR IGNORE INTO Admins (usuario, password) VALUES (?, ?)`,
    [usuarioAdmin, passwordAdmin]
  );
});

app.use('/login', AdminRouter);
app.use('/AdminPanel', AdminPanel);
app.use('/api/turnos', turnosRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
