import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, driver_license }: ICreateUserDTO =
        request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.sendStatus(201);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
