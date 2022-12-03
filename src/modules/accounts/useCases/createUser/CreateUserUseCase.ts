import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
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
