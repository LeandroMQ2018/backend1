import jwt from 'jsonwebtoken';

export const autenticarUsuario = (req, res, next) => {
  // Obtener el token desde el encabezado Authorization
  const token = req.headers['authorization']?.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No está autenticado.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRETO); // Verificar el token
    req.usuario = usuario; // Adjuntar usuario verificado a la solicitud
    next();
  } catch (error) {
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
