import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

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
    const repository = getRepository(User);

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      throw new AppError(
        'User does not exists or password does not match.',
        422,
      );
    }

    const passMatch = await compare(password, user?.password);

    if (!passMatch) {
      throw new AppError(
        'User does not exists or password does not match.',
        422,
      );
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user?.id,
      expiresIn,
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
