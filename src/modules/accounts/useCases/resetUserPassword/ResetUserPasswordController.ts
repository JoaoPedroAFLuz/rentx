import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    const teste = await resetUserPasswordUseCase.execute({
      token: token as string,
      password,
    });

    return response.json(teste);
  }
}

export { ResetUserPasswordController };
