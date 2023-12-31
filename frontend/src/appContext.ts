// Importing libraries
import {createContext, useState} from "react"

// Importing types
import { AppContextType } from "./type";

const AppContext = createContext<AppContextType>({
    allTransactions: [],
    transactions: [],
    wallets: [],
    selectedWallet: {
        id: "",
        name: "",
        description: "",
        money: 0,
        categories: [],
        user: ""
    },
    categories: [],
    budgets: [],
});

export default AppContext;