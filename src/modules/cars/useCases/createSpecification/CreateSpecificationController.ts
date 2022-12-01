import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';
import { Request, Response } from 'express';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    await this.createSpecificationUseCase.execute({ name, description });

    return response.sendStatus(201);
  }
}

export { CreateSpecificationController };
