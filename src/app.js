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

// Configuración de CORS: permitir encabezados específicos y métodos
app.use(cors({
  origin: 'https://frontend1-25dt9fa3g-leandromq2018s-projects.vercel.app', // Solo permitir solicitudes de tu frontend
  credentials: true, // Habilitar cookies o credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'], // Encabezados permitidos, incluyendo Content-Type
  preflightContinue: false, // No continuar después de la respuesta de preflight
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;
