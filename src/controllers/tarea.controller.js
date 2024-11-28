//tareacontroller
import Tarea from '../models/tarea.models.js';

// Crear nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const { titulo, descripcion, estudiante } = req.body;

    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      estudiante,
      profesor: req.usuario.id,
    });

    await nuevaTarea.save();
    res.status(201).json({ mensaje: 'Tarea creada exitosamente.', tarea: nuevaTarea });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la tarea.', error: error.message });
  }
};

// Ver todas las tareas (Profesores)
export const verTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find()
      .populate('estudiante', 'nombre')
      .populate('profesor', 'nombre');
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las tareas.', error: error.message });
  }
};

// Ver tareas del estudiante
export const verTareasEstudiante = async (req, res) => {
  try {
    // Filtra las tareas por el id del estudiante
    const tareas = await Tarea.find({ estudianteId: req.usuario.id });
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas del estudiante:', error);
    res.status(500).json({ mensaje: 'Error al obtener las tareas.' });
  }
};

// Marcar tarea como entregado/pendiente
export const marcarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const tarea = await Tarea.findById(id);
    if (!tarea || tarea.estudiante.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'No tiene permiso para modificar esta tarea.' });
    }

    tarea.estado = estado;
    await tarea.save();
    res.status(200).json({ mensaje: `Tarea marcada como ${estado}.`, tarea });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al marcar la tarea.', error: error.message });
  }
};

// Actualizar tarea
export const actualizarTarea = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion } = req.body;
  
      const tarea = await Tarea.findById(id);
      if (!tarea || tarea.profesor.toString() !== req.usuario.id) {
        return res.status(403).json({ mensaje: 'No tiene permiso para editar esta tarea.' });
      }
  
      tarea.titulo = titulo || tarea.titulo;
      tarea.descripcion = descripcion || tarea.descripcion;
  
      await tarea.save();
      res.status(200).json({ mensaje: 'Tarea actualizada exitosamente.', tarea });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la tarea.', error: error.message });
    }
  };
  
  // Asignar nota a una tarea
  export const asignarNota = async (req, res) => {
    try {
      const { id } = req.params;
      const { nota } = req.body;
  
      const tarea = await Tarea.findById(id);
      if (!tarea || tarea.estado !== 'entregado') {
        return res.status(400).json({ mensaje: 'La tarea no está en estado entregado o no existe.' });
      }
  
      tarea.nota = nota;
      await tarea.save();
      res.status(200).json({ mensaje: 'Nota asignada exitosamente.', tarea });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al asignar la nota.', error: error.message });
    }
  };
  

// Eliminar tarea (Profesores)
export const eliminarTarea = async (req, res) => {
    try {
      const { id } = req.params;
  
      const tarea = await Tarea.findById(id);
      
      if (!tarea) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada.' });
      }
  
      if (tarea.profesor.toString() !== req.usuario.id) {
        return res.status(403).json({ mensaje: 'No tiene permiso para eliminar esta tarea.' });
      }
  
   
      await Tarea.deleteOne({ _id: id });
     
  
      res.status(200).json({ mensaje: 'Tarea eliminada exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ 
        mensaje: 'Error al eliminar la tarea.', 
        error: error.message 
      });
    }
  };

