
export enum Currency {
    EUR="EUR",
    USD="USD",
    JPY="JPY"
}

export type Money = {
    amount: number,
    currency: Currency
}

export type Transaction = {
    [key: string]: string | {text: string, color: string} | Money | Date,
    description: string,
    type: {text: "expense", color: "red"} | {text: "income", color: "lime"} | {text: "investment", color: "cyan"},
    money: Money,
    date: Date
}

export type Comparator = {
    label: string, 
    tag: string
}; 

export type Wallet = {
    id: string,
    title: string
}