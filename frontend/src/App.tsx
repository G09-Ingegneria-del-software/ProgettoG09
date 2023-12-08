// Importing libraries
import { useState, useEffect, ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import axios from "axios"

// Importing pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Wallets from './pages/Wallets';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';

// Importing context
import AppContext from "./appContext";
import { User, Transaction, Wallet, Category } from "./type";

function App() {
  // let [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const token = localStorage.getItem("token") || "";
  const configRequest = {"Content-type": "application/json", "x-access-token": token};

  const verifyLoggedIn = (headers: object) => {
    if (token) {
      axios.post("/auth/isLogged", {}, {headers})
        .then((res: any) => {
          setIsLoggedIn(true);
        })
        .catch((err: Error) => {
          console.log(err.message)
          setIsLoggedIn(false); 
        })
    }
  }

  const getData = (endpoint: string, headers: object, setValues: React.Dispatch<React.SetStateAction<any[]>>) => {
    axios.get(endpoint, {headers})
        .then((res: any) => {
          for (let item of res.data) {
            delete item.__v; delete item._id;
            if (item.date) item.date = new Date(item.date);
          }
          setValues(res.data);
        })
        .catch((err: Error) => {
          console.log(err.message)
        })
  }

  useEffect(() => {
    verifyLoggedIn(configRequest);
    getData("/api/transaction", configRequest, setTransactions);
    getData("/api/wallet", configRequest, setWallets);
    getData("/api/category", configRequest, setCategories);
  }, [window.location.href]);

  return (
    <AppContext.Provider value={{ user, setUser, transactions, setTransactions, wallets, setWallets, categories, setCategories, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn && (<Dashboard />)}/>
          <Route path="/wallets" element={isLoggedIn && (<Wallets />)}/>
          <Route path="/transactions" element={isLoggedIn && (<Transactions />)}></Route>
          <Route path="/settings" element={isLoggedIn && (<Settings />)}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={isLoggedIn && (<Dashboard />)}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
