import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.get(
  '/',
  listCategoriesController.handle.bind(listCategoriesController)
);

categoriesRoutes.post(
  '/',
  createCategoryController.handle.bind(createCategoryController)
);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle.bind(importCategoryController)
);

export { categoriesRoutes };
