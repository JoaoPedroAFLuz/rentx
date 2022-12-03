import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;

  create({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
