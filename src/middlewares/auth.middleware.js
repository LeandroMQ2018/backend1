import jwt from 'jsonwebtoken';

export const autenticarUsuario = (req, res, next) => {
  // Obtener el token desde las cookies
  const token = req.cookies.token;
  console.log('Token recibido desde cookies:', token);

  if (!token) {
    console.log('No se encontró el token en las cookies.');
    return res.status(401).json({ mensaje: 'Acceso denegado. No está autenticado.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRETO); // Verificar el token
    console.log('Usuario autenticado:', usuario);
    req.usuario = usuario; // Adjuntar usuario verificado a la solicitud
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

export const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    console.log('Verificando rol del usuario:', req.usuario?.rol);
    
    if (!rolesPermitidos.includes(req.usuario?.rol)) {
      console.log(`Rol "${req.usuario?.rol}" no autorizado para esta acción.`);
      return res.status(403).json({ mensaje: 'No tiene permisos para realizar esta acción.' });
    }

    next();
  };
};
