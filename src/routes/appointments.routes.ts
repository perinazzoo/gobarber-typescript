import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentRoutes = Router();

const appointments: Array<Appointment> = [];

appointmentRoutes.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentExists = appointments.find(appoint =>
    isEqual(parsedDate, appoint?.date),
  );

  if (appointmentExists) {
    return res
      .status(409)
      .json({ error: 'This appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentRoutes;
