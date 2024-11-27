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

// Configuración de CORS
const allowedOrigins = [
  'https://frontend1-k9uj91tab-leandromq2018s-projects.vercel.app', // Reemplaza con la URL de tu frontend en Vercel
   // Para pruebas locales
];

app.use(cors({
  origin: allowedOrigins, // Especifica los orígenes permitidos
  credentials: true, // Permitir cookies en solicitudes cross-origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;

