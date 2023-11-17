import express from 'express';
import { createTransaction, getTransactions, getTransactionsByUser, getTransactionsByUserAfterDate, updateTransactionById, deleteTransactionById } from '../controller/transaction';

const transactionRouter = express.Router();

transactionRouter.post('/', createTransaction);
transactionRouter.get('/', getTransactions);
transactionRouter.get('/user', getTransactionsByUser);
transactionRouter.get('/user/date', getTransactionsByUserAfterDate);
transactionRouter.put('/', updateTransactionById);
transactionRouter.delete('/:user/:_id', deleteTransactionById);

export default transactionRouter;