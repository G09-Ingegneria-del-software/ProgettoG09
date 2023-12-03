import express from "express";
import Transaction, {TransactionType} from "../models/transaction";
import Wallet from "../models/wallet";
import Budget from "../models/budget";

// Create new transaction
export const createTransaction = async (req: express.Request, res: express.Response) => {
    try {
        const newTransaction = new Transaction({
            _id: new Date().toISOString() + " - " + req.body.user,
            category: req.body.category,
            wallet: req.body.wallet,
            type: req.body.type,
            money: req.body.money,
            description: req.body.description,
            date: new Date(),
            user: req.body.user,
        });

        let wallet = await Wallet.findOne({name: req.body.wallet, user: req.body.user});
        if (!wallet) {
            res.status(404).send('Wallet not found');
        }
        
        await newTransaction.save();
        if (req.body.type === 'income') {
            wallet!.money += req.body.money;
        }else {
            wallet!.money -= req.body.money;
        }
        await wallet!.save();

        // Try to search for budgets with the given category
        let budgets = await Budget.find({category: req.body.category, user: req.body.user});
        if (budgets && req.body.type === 'expense') {
            for (let i = 0; i < budgets.length; i++) {
                budgets[i].actualMoney -= req.body.money;
                await budgets[i].save();
            }
        }

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

// Get transaction by id
export const getTransactionById = async (req: express.Request, res: express.Response) => {
    try {
        const data = await Transaction.findById(req.params.id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Transaction not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

// Get all transactions by user
export const getTransactionsByUser = async (req: express.Request, res: express.Response) => {
    Transaction.find({user: req.params.name})
    .then((data: TransactionType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// // Get transaction by user after a date
// export const getTransactionsByUserAfterDate = async (req: express.Request, res: express.Response) => {
//     Transaction.find({user: req.params.user, date: {$gte: new Date(req.params.date)}})
//     .then((data: TransactionType[]) => {
//         res.status(200).send(data);
//     })
//     .catch((err: Error) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     });
// }

// Delete transaction by id
export const deleteTransactionById = async (req: express.Request, res: express.Response) => {
    try {
        const data = await Transaction.findByIdAndDelete(req.params.id);
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