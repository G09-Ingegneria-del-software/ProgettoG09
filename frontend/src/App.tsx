
import { BrowserRouter, Routes, Route} from "react-router-dom"

// Importing pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Wallets from './pages/Wallets';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';

function App() {

  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />   
        <Route path="/wallets" element={<Wallets />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/settings" element={<Settings />}></Route>

        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="*" element={isLoggedIn ? <Dashboard /> : <Login />}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
