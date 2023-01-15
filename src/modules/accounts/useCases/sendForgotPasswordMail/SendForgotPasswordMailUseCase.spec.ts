import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/dateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/mailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      name: 'Test',
      driver_license: '9424688',
      email: 'test@example.com',
      password: '12345',
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail if uses does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('test@example.com')
    ).rejects.toEqual(new AppError('User not found', 404));
  });

  it('should be able to create an user token', async () => {
    const createToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await usersRepositoryInMemory.create({
      name: 'Test',
      driver_license: '9424688',
      email: 'test@example.com',
      password: '12345',
    });

    await sendForgotPasswordMailUseCase.execute('test@example.com');

    expect(createToken).toHaveBeenCalled();
  });
});
