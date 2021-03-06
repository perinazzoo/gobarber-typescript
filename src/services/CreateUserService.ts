import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);

    const userExists = await repository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new AppError('This e-mail is already been taken.', 409);
    }

    const hashedPass = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPass,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;
