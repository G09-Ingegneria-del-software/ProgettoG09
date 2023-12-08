// Importing libraries
import {createContext, useState} from "react"

// Importing types
import { AppContextType } from "./type";

const AppContext = createContext<AppContextType>({
    user: null,
    transactions: [],
    wallets: [],
    categories: [],
    isLoggedIn: false
});

export default AppContext;