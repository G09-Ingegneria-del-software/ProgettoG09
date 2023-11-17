import express from 'express';
import { createWallet, getWallet, getWallets, getWalletsByUser, updateWallet, deleteWallet } from '../controller/wallet';

const walletRouter = express.Router();

walletRouter.post('/', createWallet);
walletRouter.get('/', getWallets);
walletRouter.get('/user/:name', getWalletsByUser);
walletRouter.get('/:user/:name', getWallet);
walletRouter.put('/:name', updateWallet);
walletRouter.delete('/:user/:name', deleteWallet);

export default walletRouter;