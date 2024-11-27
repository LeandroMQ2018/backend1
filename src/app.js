import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import usuarioRutas from './routes/usuario.routes.js';
import tareaRutas from './routes/tarea.routes.js';
import notaRutas from './routes/nota.routes.js';

// Configurar dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Configuración de CORS para permitir todo
app.use(cors({
  origin: true, // Permitir cualquier origen
  credentials: true, // Permitir cookies o credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: '*', // Permitir cualquier encabezado
}));
 
// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;
