import turnosRouter from './routes/turnos.router.js';
import express from 'express';
import cors from 'cors';



const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/turnos', turnosRouter);


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});