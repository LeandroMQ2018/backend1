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
  'https://frontend1-k9uj91tab-leandromq2018s-projects.vercel.app', // URL exacta del frontend en producción
];


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Permite la solicitud si el origen está en la lista
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;

