import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRoutes.get('/', (req, res) => {
  const appoitments = appointmentsRepository.all();

  return res.json(appoitments);
});

appointmentRoutes.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentExists = appointmentsRepository.findByDate(parsedDate);

  if (appointmentExists) {
    return res
      .status(409)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return res.json(appointment);
});

export default appointmentRoutes;
