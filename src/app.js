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

// Configuración de CORS global
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Encabezados permitidos
    next();
});

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/tareas', tareaRutas);
app.use('/api/notas', notaRutas);

export default app;
