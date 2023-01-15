import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  repository: UserTokens[] = [];

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.repository.find((userToken) => {
      userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token;
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.repository.find((userToken) => {
      userToken.refresh_token === refresh_token;
    });
  }

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const newUserToken = new UserTokens();

    Object.assign(newUserToken, data);

    this.repository.push(newUserToken);

    return newUserToken;
  }

  async deleteById(id: string): Promise<void> {
    this.repository = this.repository.filter(
      (userToken) => userToken.id !== id
    );
  }
}

export { UsersTokensRepositoryInMemory };
