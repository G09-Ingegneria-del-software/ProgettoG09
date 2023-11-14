import express from 'express';
import { createCategory, getCategories, getCategoriesByUser, getCategory, updateCategory, deleteCategory } from '../controller/category';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/categories', getCategories);
categoryRouter.get('/', getCategoriesByUser);
categoryRouter.get('/:name', getCategory);
categoryRouter.put('/:name', updateCategory);
categoryRouter.delete('/:name', deleteCategory);

export default categoryRouter;