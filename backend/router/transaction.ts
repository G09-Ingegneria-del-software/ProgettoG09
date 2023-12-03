import express from 'express';
import { createTransaction, getTransactions,getTransactionById, getTransactionsByUser, updateTransactionById, deleteTransactionById } from '../controller/transaction';

const transactionRouter = express.Router();

transactionRouter.post('/', createTransaction); 
transactionRouter.get('/', getTransactions); 
transactionRouter.get('/user/:name', getTransactionById);
transactionRouter.get('/:id', getTransactionsByUser);
transactionRouter.put('/', updateTransactionById);
transactionRouter.delete('/:id', deleteTransactionById); 

export default transactionRouter;