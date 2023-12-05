export type Selectable = {
  id?: string,
  title: string,
}

export interface Wallet extends Selectable {
    id: string,
}

export interface TransactionType extends Selectable {
    title: TransactionValues
}

export enum TransactionValues {
    ALL="all",
    EXPENSE="expense",
    INCOME="income",
}

export enum CurrencyValues {
    EUR="EUR",
    USD="USD",
    JPY="JPY",
    GBP="GBP",
    RUB="RUB",
}

export type Money = {
    amount: number,
    currency: CurrencyValues
}

export type Transaction = {
    description: string,
    type: {text: "expense", color: "red"} | {text: "income", color: "lime"} | {text: "investment", color: "cyan"},
    money: Money,
    date: Date,
}

export type Comparator = {
    label: string, 
    tag: string
}; 