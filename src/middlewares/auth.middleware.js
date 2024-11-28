import jwt from 'jsonwebtoken';

export const autenticarUsuario = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No está autenticado.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRETO);
    req.usuario = usuario; // El usuario debe tener el campo 'rol' en el JWT
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

export const autorizarRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario?.rol)) {
      return res.status(403).json({ mensaje: 'No tiene permisos para realizar esta acción.' });
    }
    next();
  };
};


