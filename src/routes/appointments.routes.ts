import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

interface AppointmentObject {
  provider: string;
  date: Date;
  id: string;
}

const appointmentRoutes = Router();

const appointments: Array<AppointmentObject> = [];

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

  const appointment = {
    provider,
    date: parsedDate,
    id: uuid(),
  };

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentRoutes;
