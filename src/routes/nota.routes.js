import { Router } from 'express';
import { registrarNota, verNotas } from '../controllers/nota.controller.js';
import { autenticarUsuario, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para registrar notas (Solo para profesores)
router.post('/registrar', autenticarUsuario, autorizarRoles('profesor'), registrarNota);

// Ruta para ver notas (Disponible para estudiantes y profesores)
router.get('/ver', autenticarUsuario, verNotas);

export default router;
