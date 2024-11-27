import { Router } from 'express';
import { registrarUsuario, iniciarSesion, obtenerEstudiantes,cerrarSesion } from '../controllers/usuario.controller.js';

const router = Router();

router.post('/registrar', registrarUsuario);
router.post('/iniciar-sesion', iniciarSesion);
router.get('/estudiantes', obtenerEstudiantes); // Nueva ruta
router.post('/cerrar-sesion', cerrarSesion);

export default router;
