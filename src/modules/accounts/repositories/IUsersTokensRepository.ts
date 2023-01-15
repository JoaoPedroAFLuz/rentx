import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UsersTokens';

interface IUsersTokensRepository {
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  findByRefreshToken(refresh_token: string): Promise<UserTokens>;

  create(data: ICreateUserTokenDTO): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
