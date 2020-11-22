import { getRepository } from 'typeorm';
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
      throw new Error('This e-mail is already been taken.');
    }

    const user = repository.create({
      name,
      email,
      password,
    });

    await repository.save(user);

    return user;
  }
}

export default CreateUserService;
