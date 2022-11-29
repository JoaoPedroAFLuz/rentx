import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get(
  '/',
  listCategoriesController.handle.bind(listCategoriesController)
);

categoriesRoutes.post(
  '/',
  createCategoryController.handle.bind(createCategoryController)
);

export { categoriesRoutes };
