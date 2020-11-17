import { Router } from 'express';
import appointmentRoutes from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);

export default routes;
