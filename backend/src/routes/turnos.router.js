import { Router } from 'express';
import { obtenerTurnosOcupados, crearTurno } from '../controller/turnos.controller.js';

const router = Router();

router.get('/', obtenerTurnosOcupados);
router.post('/', crearTurno);


export default router;