import express from 'express';
import { loginAdmin } from '../controller/adminLogin.contoller.js';
const router = express.Router();

router.post('/', loginAdmin);

export default router;
