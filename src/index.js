import express from 'express'
import cors from "cors";
import usersRoutes from './router/users.router.js';
import projectRoutes from './router/projects.router.js'
import taskRoutes from './router/task.router.js'

const e=express();
e.use(express.json());

e.use(cors());

// Usar las rutas
e.use('/api', usersRoutes);
e.use('/api', projectRoutes);
e.use('/api', taskRoutes);

e.listen(5000);

console.log("escuchando el puerto 5000");
