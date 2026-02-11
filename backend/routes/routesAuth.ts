import express from 'express';
import { fazerLogin } from '../controller/controllerAuth';

const router = express.Router();

// POST /api/login - Fazer login (fake)
router.post('/login', fazerLogin);

export default router;
