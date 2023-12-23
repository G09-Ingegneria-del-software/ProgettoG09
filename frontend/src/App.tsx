// Importing libraries
import { useState, useEffect, useContext, ReactElement } from "react";
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
import AuthContext from "./authContext";

// Importing utils
import { getRequestHeaders, removeUnderscore } from "./utils"

function App() {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  // Verifying if the user with the token is logged in
  const verifyLogin = (callback: () => void) => {
    const {token, headers} = getRequestHeaders();

    if (token) {
      axios.post(process.env.REACT_APP_API_URI + "/auth/isLogged", {}, {headers})
        .then((res: any) => {
          console.log("Login successful")
          
          setAuthenticated(true);
          const email = localStorage.getItem("email") || "";
          if (email) {
            console.log("Updating data");
            callback();
          }
        })
        .catch((err: Error) => {
          console.log("You must login");
          setAuthenticated(false);
        })
    } else {
      setAuthenticated(false);
    }
  }
  // Making all the necessary API calls and retrieving information
  const getInfo = () => {
    const email: string = localStorage.getItem("email") || "";
    if (email) {
      getData(`/api/user/${email}`, setUser);
      getData(`/api/transaction/user/${email}`, setAllTransactions);
      getData(`/api/wallet/user/${email}`, setWallets);
      getData(`/api/category/user/${email}`, setCategories);
      getData(`/api/budget/user/${email}`, setBudgets);
    }
  }
  // Getting data from single endpoint
  const getData = (endpoint: string, setValues: any) => {
    const {token, headers} = getRequestHeaders();

    if (token) {
      axios.get(process.env.REACT_APP_API_URI + endpoint, {headers})
        .then((res: any) => {
          console.log(res.data);
          if (Array.isArray(res.data)) {
            for (let item of res.data) {
              item.id = item._id;
              delete item.__v; delete item._id;
              if (item.date) item.date = new Date(item.date);
              if (item.name) item.name = removeUnderscore(item.name);
              if (item.category) item.category = removeUnderscore(item.category);
              if (item.wallet) item.wallet = removeUnderscore(item.wallet);
            }
          } else {
            delete res.data.__v; delete res.data._id;
          }
          setValues(res.data);
          setIsLoading(false);
        })
        .catch((err: Error) => {
          return <Navigate replace to="/login"/>
        })
    }
  }

  useEffect(() => {
    verifyLogin(getInfo);
  }, []);

  useEffect(() => {
    if (allTransactions && wallets[0]) {
      if (selectedWallet) {
        setTransactions(allTransactions.filter((t: Transaction) => t.wallet === selectedWallet.name)); 
      } else {
        setSelectedWallet(wallets[0]);
        setTransactions(allTransactions.filter((t: Transaction) => t.wallet === wallets[0].name));
      }
    }
  }, [allTransactions, wallets]);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, user, setUser }}>
      <AppContext.Provider value={{ allTransactions, setAllTransactions, transactions, setTransactions, wallets, setWallets, selectedWallet, setSelectedWallet, categories, setCategories, budgets, setBudgets }}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<PrivateOutlet isLoading={isLoading} element={<Dashboard />} />} />
            <Route path="/wallets" element={<PrivateOutlet isLoading={isLoading} element={<Wallets />} />}/>
            <Route path="/transactions" element={<PrivateOutlet isLoading={isLoading} element={<Transactions />} />}/>
            <Route path="/categories" element={<PrivateOutlet isLoading={isLoading} element={<Categories/>} />}/>
            <Route path="/budgets" element={<PrivateOutlet isLoading={isLoading} element={<Budgets/>} />}/>
            <Route path="/settings" element={<PrivateOutlet isLoading={isLoading} element={<Settings />} />} />
            <Route path="*" element={<PrivateOutlet isLoading={isLoading} element={<Dashboard />}/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

type PrivateRouteProps = {
  element: ReactElement
  isLoading: boolean
}
const PrivateOutlet: React.FC<PrivateRouteProps> = ({element, isLoading}: PrivateRouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  // return isAuthenticated ? (element) : <Navigate replace to="/login" />;
  return isAuthenticated ? element : <Navigate replace to="/login"/>;
}

export default App;
