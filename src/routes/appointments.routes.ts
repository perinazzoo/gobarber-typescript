import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateAppoinmentService from '../services/CreateAppointmentService';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRoutes.get('/', (req, res) => {
  const appoitments = appointmentsRepository.all();

  return res.json(appoitments);
});

appointmentRoutes.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppoinmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err?.message });
  }
});

export default appointmentRoutes;
