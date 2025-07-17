import { Router } from 'express';
import { obtenerTurnosDisponibles, crearTurno } from '../controller/turnos.controller.js';

const router = Router();

router.get('/:fecha', obtenerTurnosDisponibles);
router.post('/', crearTurno);

export default router;