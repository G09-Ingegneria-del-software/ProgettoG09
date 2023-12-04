import express from "express";
import Budget, {BudgetType} from "../models/budget";

// Create new budget
export const createBudget = (req: express.Request, res: express.Response) => {
    Budget.findOne({name: req.body.name, user: req.body.user})
    .then((data: BudgetType | null) => {
        if (!data) {
            const newBudget = new Budget({
                _id : req.body.name,
                name: req.body.name,
                description: req.body.description,
                initialMoney: req.body.initialMoney,
                actualMoney: req.body.initialMoney,
                category: req.body.category,
                color: req.body.color,
                user: req.body.user
            });

            newBudget.save()
            .then((data: BudgetType) => {
                res.status(201).send('Budget created');
            })
            .catch((err: Error) => {
                res.status(500).send('Internal Server Error');
            });

        }else {
            res.status(409).send('Budget name already in use');
        }
    })
    .catch((err: Error) => {
        res.status(500).send('Internal Server Error');
    });
}

// Get all budgets
export const getBudgets = (req: express.Request, res: express.Response) => {
    Budget.find()
    .then((data: BudgetType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get all budgets by user
export const getBudgetsByUser = (req: express.Request, res: express.Response) => {
    Budget.find({user: req.params.name})
    .then((data: BudgetType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get budget by name
export const getBudget = (req: express.Request, res: express.Response) => {
    Budget.findOne({name: req.params.name, user: req.params.user})
    .then((data: BudgetType | null) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Budget not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Update budget
export const updateBudget = (req: express.Request, res: express.Response) => {
        Budget.findOneAndUpdate({name: req.params.name, user: req.body.user}, req.body, {new: true})
            .then((data: BudgetType | null) => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Budget not found');
                }
            })
            .catch((err: Error) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
}

// Delete budget
export const deleteBudget = (req: express.Request, res: express.Response) => {
    Budget.findOneAndDelete({name: req.params.name, user: req.params.user})
    .then((data: BudgetType | null) => {
        if (data) {
            res.status(200).send('Budget deleted');
        } else {
            res.status(404).send('Budget not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}