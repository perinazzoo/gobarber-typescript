import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSession = new CreateSessionService();

  const { user, token } = await createSession.execute({ email, password });

  return res.json({ user, token });
});

export default sessionsRoutes;
