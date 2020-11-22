import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAppoinmentService from '../services/CreateAppointmentService';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();

appointmentRoutes.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentsRepository);

  const appoitments = await repository.find();

  return res.json(appoitments);
});

appointmentRoutes.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppoinmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err?.message });
  }
});

export default appointmentRoutes;
