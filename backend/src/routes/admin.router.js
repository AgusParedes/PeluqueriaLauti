import { Router } from 'express';
import { borrarTurno, obtenerTurnosReservados, bloquearTurno } from '../controller/admin.controller.js';

const router = Router();

router.get('/turnos', obtenerTurnosReservados);
router.post('/bloquear', bloquearTurno);
router.delete('/turnos/:id', borrarTurno);


export default router;