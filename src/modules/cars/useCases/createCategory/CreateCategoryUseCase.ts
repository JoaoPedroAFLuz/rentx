import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError('Category already exists', 400);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
