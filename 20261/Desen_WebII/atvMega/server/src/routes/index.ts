import { Router } from 'express';
import megaRouter from '@/routes/routes_mega.js'; // Use .js se o NodeNext exigir, ou sem nada

const routes = Router();

routes.use('/concurso', megaRouter);

export default routes;