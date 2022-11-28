import { Router } from 'express';

import { CreateCategoryService } from '../services/CreateCategoryService';
import { CategoriesRepository } from './../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get('/', (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoriesServices = new CreateCategoryService(
    categoriesRepository
  );

  createCategoriesServices.execute({ name, description });

  return response.sendStatus(201);
});

export { categoriesRoutes };
