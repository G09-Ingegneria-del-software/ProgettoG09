// Adding request headers
export const getRequestHeaders = () => { 
    const token = localStorage.getItem("token") || "";
    const configRequest = {
      "Content-type": "application/json", 
      "x-access-token": token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    };
    return {token, headers: configRequest};
}

// When sending names of something like wallets, categories, budgets, transactions
// For requests that require params in URL like ".../:name"
export const formatName = (name: string) => name.split(" ").join("_");