import { Router } from 'express';
import { 
  crearTarea, 
  verTareas, 
  verTareasEstudiante, 
  marcarTarea, 
  actualizarTarea, 
  eliminarTarea, 
  asignarNota 
} from '../controllers/tarea.controller.js';
import { autenticarUsuario, autorizarRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// CRUD de tareas para profesores
router.post('/', autenticarUsuario, autorizarRoles('profesor'), crearTarea);
router.get('/', autenticarUsuario, autorizarRoles('profesor'), verTareas);
router.patch('/:id', autenticarUsuario, autorizarRoles('profesor'), actualizarTarea);
router.delete('/:id', autenticarUsuario, autorizarRoles('profesor'), eliminarTarea);

// Rutas específicas para estudiantes
router.get('/estudiante', autenticarUsuario, autorizarRoles('estudiante'), verTareasEstudiante);
router.patch('/:id/marcar', autenticarUsuario, autorizarRoles('estudiante'), marcarTarea);


// Asignar nota a tarea entregada (Profesores)
router.post('/:id/asignar-nota', autenticarUsuario, autorizarRoles('profesor'), asignarNota);

export default router;
