import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';
import sessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
