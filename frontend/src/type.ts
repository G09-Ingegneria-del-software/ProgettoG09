
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
    description: string,
    type: {text: "expense", color: "red"} | {text: "income", color: "lime"} | {text: "investment", color: "cyan"},
    money: Money,
    date: Date
}