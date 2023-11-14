import express from "express";
import Transaction, {TransactionType} from "../models/transaction";
// TODO: add the logic that once a transaction is done, wallet is updated as well
// Create new transaction
export const createTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const newTransaction = new Transaction({
            _id : req.body._id,
            name: req.body.name,
            description: req.body.description,
            money: req.body.money,
            date: req.body.date,
            category: req.body.category,
            wallet: req.body.wallet,
            user: req.body.user,
        });

        await newTransaction.save();
        res.status(201).send('Transaction created');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Get all transactions
export const getTransactions = async (req: express.Request, res: express.Response) => {
    try {
        const data = await Transaction.find();
        res.status(200).send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Get all transactions by user
export const getTransactionsByUser = async (req: express.Request, res: express.Response) => {
    Transaction.find({user: req.body.user})
    .then((data: TransactionType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get transaction by user after a date
export const getTransactionsByUserAfterDate = async (req: express.Request, res: express.Response) => {
    Transaction.find({user: req.body.user, date: {$gte: req.body.date}})
    .then((data: TransactionType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Delete transaction by id
export const deleteTransactionById = async (req: express.Request, res: express.Response) => {
    try {
        const data = await Transaction.findByIdAndDelete(req.body._id);
        if (data) {
            res.status(200).send('Transaction deleted');
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Update transaction by id
export const updateTransactionById = async (req: express.Request, res: express.Response) => {
    Transaction.findByIdAndUpdate(req.body._id, req.body, {new: true})
    .then((data: TransactionType | null) => {
        if (data) {
            res.status(200).send('Transaction updated');
        } else {
            res.status(404).send('Transaction not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}