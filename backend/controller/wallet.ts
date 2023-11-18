import express from "express";
import Wallet, {WalletType} from "../models/wallet";

// Create new wallet
export const createWallet = (req: express.Request, res: express.Response) => {
    Wallet.findOne({name: req.body.name, user: req.body.user})
    .then((data: WalletType | null) => {
        if (!data){
            let newWallet = new Wallet({
                _id : req.body.name,
                name: req.body.name,
                description: req.body.description,
                money: req.body.money,
                categories: req.body.categories,
                color: req.body.color,
                user: req.body.user,
            });

            newWallet.save()
            .then((data: WalletType) => {
                res.status(201).send('Wallet created');
            })
            .catch((err: Error) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });
        }else {
            res.status(500).send('Internal Server Error');
        }
    });
};

// Get all wallets
export const getWallets = (req: express.Request, res: express.Response) => {
    Wallet.find()
    .then((data: WalletType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get all wallets by user
export const getWalletsByUser = (req: express.Request, res: express.Response) => {
    Wallet.find({user: req.params.name})
    .then((data: WalletType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get wallet by name and user
export const getWallet = (req: express.Request, res: express.Response) => {
    Wallet.findOne({name: req.params.name, user: req.params.user})
    .then((data: WalletType | null) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Wallet not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Update wallet by name and user
export const updateWallet = (req: express.Request, res: express.Response) => {
    Wallet.findOne({name: req.body.name, user: req.body.user})
    .then((data: WalletType | null) => {
        if (data) {
            res.status(409).send('Wallet name already in use');
        }else{
            Wallet.findOneAndUpdate({name: req.params.name, user: req.body.user}, req.body, {new: true})
                .then((data: WalletType | null) => {
                    if (data) {
                        res.status(200).send('Wallet updated');
                    } else {
                        res.status(404).send('Wallet not found');
                    }
                })
                .catch((err: Error) => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                });
        }}
    )
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}
// Delete wallet by name and user
export const deleteWallet = (req: express.Request, res: express.Response) => {
    Wallet.findOneAndDelete({name: req.params.name, user: req.params.user})
    .then((data: WalletType | null) => {
        if (data) {
            res.status(200).send('Wallet deleted');
        } else {
            res.status(404).send('Wallet not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}