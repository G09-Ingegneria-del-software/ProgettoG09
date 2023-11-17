import express from 'express';
import { createBudget, getBudgets,getBudgetsByUser, getBudget, updateBudget, deleteBudget } from '../controller/budget';

const budgetRouter = express.Router();

budgetRouter.post('/', createBudget);
budgetRouter.get('/', getBudgets);
budgetRouter.get('/user/:name', getBudgetsByUser);
budgetRouter.get('/:user/:name', getBudget);
budgetRouter.put('/:name', updateBudget);
budgetRouter.delete('/:user/:name', deleteBudget);

export default budgetRouter;