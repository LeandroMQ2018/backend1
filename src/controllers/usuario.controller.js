import Usuario from '../models/usuario.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Registrar Usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    if (!nombre || !correo || !contraseña || !rol) {
      return res.status(400).json({ mensaje: 'Por favor, complete todos los campos.' });
    }

    if (!['profesor', 'estudiante'].includes(rol)) {
      return res.status(400).json({ mensaje: 'Rol inválido. Debe ser "profesor" o "estudiante".' });
    }

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito.', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.', error: error.message });
  }
};
export const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Usuario.find({ rol: 'estudiante' }).select('nombre');
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la lista de estudiantes.', error: error.message });
  }
};

// Iniciar Sesión
export const iniciarSesion = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    console.log('Datos recibidos:', { correo, contraseña });

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    console.log('Usuario encontrado:', usuario);

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    console.log('Resultado de comparación de contraseña:', contraseñaValida);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRETO,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true }).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.', error: error.message });
  }
};
export const cerrarSesion = (req, res) => {
  res.clearCookie('token').json({ mensaje: 'Sesión cerrada exitosamente.' });
};

