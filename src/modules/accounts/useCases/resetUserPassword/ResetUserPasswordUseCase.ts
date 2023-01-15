import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/dateProvider/IDateProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepositories: IUsersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Token invalid');
    }

    const isTokenExpired = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );

    if (isTokenExpired) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepositories.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepositories.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordUseCase };
