import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('Email already in use', 400);
    }

    const passwordEncrypted = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordEncrypted,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
