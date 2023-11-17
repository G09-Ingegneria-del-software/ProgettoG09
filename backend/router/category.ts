import express from 'express';
import { createCategory, getCategories, getCategoriesByUser, getCategory, updateCategory, deleteCategory } from '../controller/category';

const categoryRouter = express.Router();

categoryRouter.post('/', createCategory);
categoryRouter.get('/', getCategories);
categoryRouter.get('/user/:name', getCategoriesByUser);
categoryRouter.get('/:user/:name', getCategory);
categoryRouter.put('/:name', updateCategory);
categoryRouter.delete('/:user/:name', deleteCategory);

export default categoryRouter;