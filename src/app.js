import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'; // Cargar dotenv

import usuarioRutas from './routes/usuario.routes.js'; // Rutas de usuarios
import tareaRutas from './routes/tarea.routes.js'; // Rutas de tareas
import notaRutas from './routes/nota.routes.js'; // Rutas de notas

// Configurar dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
// Configuración de CORS permitiendo cualquier origen
app.use(cors({
    origin: 'https://frontend1-3v16b6mvd-leandromq2018s-projects.vercel.app', // Cambia esto a tu URL de Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Esto es necesario si usas autenticación basada en cookies
}));





// Rutas
app.use('/api/usuarios', usuarioRutas); // Para rutas de usuarios
app.use('/api/tareas', tareaRutas); // Para rutas de tareas
app.use('/api/notas', notaRutas); // Para rutas de notas

export default app;
