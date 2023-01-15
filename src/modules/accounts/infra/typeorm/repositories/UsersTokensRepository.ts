import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UsersTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return await this.repository.findOne({ user_id, refresh_token });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.repository.findOne({ refresh_token });
  }

  create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create(data);

    return this.repository.save(userToken);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
