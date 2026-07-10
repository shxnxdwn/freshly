import type { UpdateUserBody, User, UserId } from '@freshly/contracts';
import { userRepository } from './user.repository';
import { toUser } from './user.mapper';
import { NotFoundError } from '../../errors/app-error';

export class UserService {
  public async getUser(userId: UserId): Promise<User> {
    const row = await userRepository.findById(userId);
    if (!row) throw new NotFoundError('User not found');
    return toUser(row);
  }

  public async updateUser(userId: UserId, body: UpdateUserBody): Promise<User> {
    const row = await userRepository.updateById(userId, body);
    if (!row) throw new NotFoundError('User not found');
    return toUser(row);
  }

  public async deleteUser(userId: UserId): Promise<void> {
    await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
