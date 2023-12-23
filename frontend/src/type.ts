
export type Selectable = {
    id?: string,
    title: string,
}

// User type
export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isBlocked: boolean,
}

// Transaction type
export type Transaction = {
    id: string,
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
export enum TransactionType {
    EXPENSE="expense",
    INCOME="income"
}
export interface TransactionSelectType extends Selectable {
    title: TransactionValues
}

// Wallet type
export type Wallet = {
    id: string,
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
    id: string,
    name: string,
    tags: string[],
    user: string
}

// Budget type
export type Budget = {
    id: string,
    name: string,
    description: string,
    initialMoney: number,
    actualMoney: number,
    category: string,
}

// App context type
export type AppContextType = {
    allTransactions: Transaction[],
    setAllTransactions?: (transactions: Transaction[]) => void,
    transactions: Transaction[],
    setTransactions?: (transactions: Transaction[]) => void, 
    wallets: Wallet[],
    setWallets?: (wallets: Wallet[]) => void, 
    selectedWallet: Wallet | null,
    setSelectedWallet?: (wallet: Wallet) => void,
    categories: Category[],
    setCategories?: (categories: Category[]) => void, 
    budgets: Budget[],
    setBudgets?: (budgets: Budget[]) => void,
};

export type AuthContextType = {
    isAuthenticated: boolean,
    setAuthenticated: (isAuthenticated: boolean) => void,
    user: User | null,
    setUser?: (user: User) => void,
}

export type Comparator = {
    label: string, 
    tag: string
}; 