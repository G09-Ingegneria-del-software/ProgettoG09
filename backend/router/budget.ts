import express from 'express';
import { createBudget, getBudgets,getBudgetsByUser, getBudget, updateBudget, deleteBudget } from '../controller/budget';

const budgetRouter = express.Router();

budgetRouter.post('/', createBudget);
budgetRouter.get('/budgets', getBudgets);
budgetRouter.get('/', getBudgetsByUser);
budgetRouter.get('/:name', getBudget);
budgetRouter.put('/:name', updateBudget);
budgetRouter.delete('/:name', deleteBudget);

export default budgetRouter;