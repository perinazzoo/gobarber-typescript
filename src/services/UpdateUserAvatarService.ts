import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  filename: string;
}

interface Response {
  avatar: string;
}

class UpdateUserAvatarServer {
  public async execute({ user_id, filename }: Request): Promise<Response> {
    const repository = getRepository(User);

    const user = await repository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarExists = fs.existsSync(userAvatarPath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = filename;

    await repository.save(user);

    return {
      avatar: user.avatar,
    };
  }
}

export default UpdateUserAvatarServer;
