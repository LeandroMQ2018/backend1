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

// Función para permitir el origen dinámicamente
const corsOptions = {
  origin: (origin, callback) => {
    // Asegúrate de que la URL de tu frontend en Vercel está incluida correctamente
    if (!origin || origin === 'https://frontend1-9vgb5n04g-leandromq2018s-projects.vercel.app') {
      callback(null, true); // Permitir el origen si es válido
    } else {
      callback(new Error('CORS no permitido'), false);
    }
  },
  credentials: true, // Habilitar cookies o credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
};

// Configurar CORS
app.use(cors(corsOptions));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;

