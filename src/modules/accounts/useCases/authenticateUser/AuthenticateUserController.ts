import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUserCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const access_token = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json(access_token);
  }
}

export { AuthenticateUserController };
