import { Dispatch, SetStateAction } from "react"

export type Selectable = {
    id?: string,
    title: string,
}

// User type
export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isBlocked: boolean
}

// Transaction type
export type Transaction = {
    category: string,
    description: string,
    type: string | TransactionValues.EXPENSE | TransactionValues.INCOME,
    money: number,
    date: Date,
    wallet: string,
    user: string
}

export const calculateColor = (type: string) => (type === "expense" ? "red" : "lime");
export enum TransactionValues {
    ALL="all",
    EXPENSE="expense",
    INCOME="income",
}
export interface TransactionType extends Selectable {
    title: TransactionValues
}

// Wallet type
export type Wallet = {
    name: string,
    description: string,
    money: number,
    categories: string[],
    user: string
};

export interface WalletType extends Selectable {
    id: string,
}

// Category type
export type Category = {
    name: string,
    tags: string[],
    user: string
}

// App context type
export type AppContextType = {
    user: User | null, 
    setUser?: (user: User) => void, 
    transactions: Transaction[],
    setTransactions?: (transactions: Transaction[]) => void, 
    wallets: Wallet[],
    setWallets?: (wallets: Wallet[]) => void, 
    categories: Category[],
    setCategories?: (categories: Category[]) => void, 
    isLoggedIn: boolean,
    setIsLoggedIn?: (isLoggedIn: boolean) => void, 
};


export type Comparator = {
    label: string, 
    tag: string
}; 