import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: {
    name: string;
  };

  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('User does not exists or password does not match.');
    }

    const passMatch = await compare(password, user?.password);

    if (!passMatch) {
      throw new Error('User does not exists or password does not match.');
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user?.id,
      expiresIn: '3d',
    });

    return {
      user: {
        name: user?.name,
      },
      token,
    };
  }
}

export default CreateSessionService;
