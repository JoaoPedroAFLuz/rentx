import { AppError } from '@shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Name',
      description: 'Category Description',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated.name).toBe('Category Name');
  });

  it('should not be able to create a new category with name in use', async () => {
    const category = {
      name: 'Category Name',
      description: 'Category Description',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError('Category already exists', 400));
  });
});
