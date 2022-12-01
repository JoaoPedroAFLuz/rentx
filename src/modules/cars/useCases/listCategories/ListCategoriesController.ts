import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const categories = await this.listCategoryUseCase.execute();

      return response.json(categories);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
