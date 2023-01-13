import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../infra/typeorm/entities/UsersTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
