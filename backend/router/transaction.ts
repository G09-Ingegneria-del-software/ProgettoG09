import express from 'express';
import { createTransaction, getTransactions,getTransactionById, getTransactionsByUser, updateTransactionById, deleteTransactionById } from '../controller/transaction';

const transactionRouter = express.Router();

transactionRouter.post('/api/transaction/', createTransaction); 
transactionRouter.get('/api/transaction/', getTransactions); 
transactionRouter.get('/api/transaction/user/:name', getTransactionById);
transactionRouter.get('/api/transaction/:id', getTransactionsByUser);
transactionRouter.put('/api/transaction/', updateTransactionById);
transactionRouter.delete('/api/transaction/:id', deleteTransactionById); 

export default transactionRouter;