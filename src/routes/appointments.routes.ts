import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import ensureAuth from '../middlewares/ensureAuthenticated';

import CreateAppoinmentService from '../services/CreateAppointmentService';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();

appointmentRoutes.use(ensureAuth);

appointmentRoutes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentsRepository);

  const appoitments = await repository.find();

  return res.json(appoitments);
});

appointmentRoutes.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppoinmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentRoutes;
