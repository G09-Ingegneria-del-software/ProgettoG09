// Importing types

export const K = {
    currencies: [
        "EUR",
        "JPY",
        "GBP",
        "RUB",
        "YEN"
    ],
    transactionTypes: [
        "income",
        "expense",
    ],
    transactionSelectTypes: [
        "all",
        "income",
        "expense",
    ],
    wallets: [
        "American express",
        "American express Platinum",
        "Paypal",
        "Swiss bank"
    ]
}

export const checkPassword = (password: string) => { 
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}