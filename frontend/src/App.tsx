// Importing libraries
import { useState, useEffect, ReactNode, useContext, ReactElement } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom"
import axios from "axios"

// Importing pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Wallets from './pages/Wallets';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Loading from "./pages/Loading";

// Importing context
import AppContext from "./appContext";
import { User, Transaction, Wallet, Category, Budget } from "./type";
import Categories from "./pages/Categories";
import Budgets from "./pages/Budgets";

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const verifyLoggedIn = () => {
    const token = localStorage.getItem("token") || "";
    const configRequest = {"Content-type": "application/json", "x-access-token": token};
    if (token) {
      axios.post("/auth/isLogged", {}, {headers: configRequest})
        .then((res: any) => {
          setIsLoggedIn(true);
        })
        .catch((err: Error) => {
          setIsLoggedIn(false); 
        })
    }
  }

  const getData = (endpoint: string, setValues: React.Dispatch<React.SetStateAction<any[]>>) => {
    const token = localStorage.getItem("token") || "";
    const configRequest = {"Content-type": "application/json", "x-access-token": token};
    axios.get(endpoint, {headers: configRequest})
        .then((res: any) => {
          for (let item of res.data) {
            item.id = item._id;
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
    if(!isLoggedIn) verifyLoggedIn();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getData("/api/transaction", setAllTransactions);
      getData("/api/wallet", setWallets);
      getData("/api/category", setCategories);
      getData("/api/budget", setBudgets);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setSelectedWallet(wallets[0]);
    setTransactions(allTransactions.filter((t: Transaction) => t.wallet === wallets[0].name));
  }, [allTransactions, wallets]);

  if (isLoading) return <Loading />;

  return (
    <AppContext.Provider value={{ user, setUser, allTransactions, setAllTransactions, transactions, setTransactions, wallets, setWallets, selectedWallet, setSelectedWallet, categories, setCategories, budgets, setBudgets, isLoggedIn, setIsLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateOutlet element={<Dashboard />} />} />
          <Route path="/wallets" element={<PrivateOutlet element={<Wallets />} />}/>
          <Route path="/transactions" element={<PrivateOutlet element={<Transactions />} />}/>
          <Route path="/categories" element={<PrivateOutlet element={<Categories/>} />}/> 
          <Route path="/budgets" element={<PrivateOutlet element={<Budgets/>} />}/> 
          <Route path="/settings" element={<PrivateOutlet element={<Settings />} />} />
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<PrivateOutlet element={<Dashboard />}/>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

type PrivateRouteProps = {
  element: ReactElement
}
const PrivateOutlet: React.FC<PrivateRouteProps> = ({element}: PrivateRouteProps) => {
  const {isLoggedIn} = useContext(AppContext);

  return isLoggedIn ? (element) : <Navigate replace to="/login" />;
}

export default App;
