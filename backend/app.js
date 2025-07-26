import turnosRouter from './src/routes/turnos.router.js';
import AdminRouter from './src/routes/adminLogin.router.js';
import AdminPanel from './src/routes/admin.router.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config(); 
const app = express();
app.use(cors());
app.use(express.json());



app.use('/login', AdminRouter);
app.use('/AdminPanel', AdminPanel);
app.use('/api/turnos', turnosRouter);


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});