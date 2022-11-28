import { ICategoriesRepository } from './../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest) {
    const category = this.categoriesRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}