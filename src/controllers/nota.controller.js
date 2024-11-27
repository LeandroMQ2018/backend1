import Nota from '../models/nota.models.js';
import Usuario from '../models/usuario.models.js';

// Registrar Nota (Solo profesores)
export const registrarNota = async (req, res) => {
  try {
    const { estudiante, asignatura, calificacion } = req.body;

    // Verificar que el estudiante existe
    const estudianteExiste = await Usuario.findById(estudiante);
    if (!estudianteExiste || estudianteExiste.rol !== 'estudiante') {
      return res.status(400).json({ mensaje: 'El usuario seleccionado no es un estudiante válido.' });
    }

    const nuevaNota = new Nota({
      estudiante,
      asignatura,
      calificacion,
      profesor: req.usuario.id,
    });

    await nuevaNota.save();
    res.status(201).json({ mensaje: 'Nota registrada exitosamente.', nota: nuevaNota });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar la nota.', error: error.message });
  }
};

// Ver Notas (Profesores ven todas, estudiantes solo las suyas)
export const verNotas = async (req, res) => {
  try {
    if (req.usuario.rol === 'profesor') {
      const notas = await Nota.find()
        .populate('estudiante', 'nombre correo')
        .populate('profesor', 'nombre');
      res.status(200).json(notas);
    } else if (req.usuario.rol === 'estudiante') {
      const notas = await Nota.find({ estudiante: req.usuario.id })
        .populate('profesor', 'nombre');
      res.status(200).json(notas);
    } else {
      res.status(403).json({ mensaje: 'No tiene permiso para ver notas.' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las notas.', error: error.message });
  }
};
