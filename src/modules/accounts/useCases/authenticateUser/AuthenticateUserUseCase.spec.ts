import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemoru } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUserCase';

let usersRepositoryInMemory: UsersRepositoryInMemoru;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemoru();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0003132',
      email: 'user@example.com',
      name: 'User',
      password: '12345',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@example.com',
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with incorrect e-mail', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '0003132',
        email: 'user@example.com',
        name: 'User with incorrect e-mail',
        password: '12345',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'incorrect_email@example.com',
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '0003132',
        email: 'user@example.com',
        name: 'User with incorrect password',
        password: '12345',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'user@example.com',
        password: 'incorrect password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
