// Importing libraries
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Importing pages
import UserPage from './UserPage';

// Importing components
import DashboardSection from '../components/DashboardSection';
import Title from "../components/common/Title";
import Description from '../components/common/Description';
import {ButtonIcon} from '../components/common/Button';
import Card from "../components/Card"
import Subtitle from '../components/common/Subtitle';
import Select from "../components/common/Select";
import InputText from "../components/common/InputText";

import Line from "../components/common/Line";
import Spacer from "../components/common/Spacer";

import Modal from "../components/common/Modal";

// Importing types
import { Category, Transaction, TransactionType, TransactionValues, calculateColor } from '../type';

// Importing static stuff
import { K } from "../K";

// Importing context
import AuthContext from "../authContext";
import AppContext from "../appContext";

const Dashboard = () => {

    const {user} = useContext(AuthContext);
    const {transactions, setTransactions, wallets, selectedWallet, setSelectedWallet, categories} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // Transaction state
    const [type, setType] = useState<string>(TransactionType.EXPENSE);
    const [description, setDescription] = useState<string>("");
    const [money, setMoney] = useState<number>(0);
    const [walletName, setWalletName] = useState<string>(wallets[0]?.name || "No wallet specified");
    const [categoryName, setCategoryName] = useState<string>(categories[0]?.name || "No category specified");
    
    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);

    const handleCreateTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || null;
        if (token) {
            const configRequest = {"Content-type": "application/json", "x-access-token": token};
            const transaction = {
                user: user?.email,
                type,
                money,
                description,
                wallet: walletName,
                category: categoryName 
            }
            axios.post(process.env.REACT_APP_API_URI + "/api/transaction", transaction, {headers: configRequest})
                .then(res => {
                    const transactionData = res.data;
                    delete transactionData.__v; delete transactionData._id;
                    transactionData.date = new Date(transactionData.date);
                    setTransactions ? setTransactions([...transactions, transactionData]) : console.log("setTransaction is undefined");

                    let money = (selectedWallet?.money || 0) + (transaction.type === TransactionType.EXPENSE ? -transaction.money : transaction.money);
                    axios.put(`${process.env.REACT_APP_API_URI}/api/wallet/${walletName}`, {user: user?.email || "", money}, {headers: configRequest})
                        .then(res => setAddModalOpen(!addModalOpen))
                        .catch(err => console.log(err.message))
                })
                .catch(err => console.log(err.message))
        }
    }

    const calculateIncomeExpense = () => {
        let newIncome: number = 0;
        let newExpense: number = 0;

        if (transactions) {
            const lastTransactions = transactions.filter((t: Transaction) => t.date.getMonth() === new Date(Date.now()).getMonth());
            const incomeTransactions = lastTransactions.filter((t: Transaction) => t.type === TransactionType.INCOME);
            const expenseTransactions = lastTransactions.filter((t: Transaction) => t.type === TransactionType.EXPENSE);

            for (let t of incomeTransactions) newIncome += t.money;
            for (let t of expenseTransactions) newExpense += t.money;
        }

        setIncome(Math.round(newIncome*100)/100);
        setExpense(Math.round(newExpense*100)/100);
    }

    useEffect(() => {
        calculateIncomeExpense();
    }, [transactions]);

    return (
        <UserPage>
            {/* Modal popup for adding transaction */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add transaction" description="Insert values for all fields to create a transaction" buttonLabel="Add" onSubmitClick={handleCreateTransaction}>
                <div className="flex flex-col justify-start gap-4">
                    <Select label="Type" data={K.transactionTypes} value={type} onChange={setType}/>
                    <InputText label="Description" value={description} setValue={setDescription} />
                    <InputText label="Amount" value={money.toString()} setValue={setMoney} />
                    <Select label="Wallet" data={wallets.map(({name}) => name)} value={walletName} onChange={setWalletName}/>
                    <Select label="Category" data={categories.map(({name}) => name)} value={categoryName} onChange={setCategoryName}/>
                </div> 
            </Modal>

            {/* Title container */}
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Dashboard" />
                    <Description description="Updated 12 hrs ago"/>
                </div>
                <ButtonIcon text="Add transaction" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>

            <Spacer height="2rem"/>

            <div className="w-full grid grid-cols-flow grid-cols-2 gap-4">
                {/* Balance section */}
                <DashboardSection subtitle='Balance' description='Everything about your balance on the account'>
                    <Card description='Your current balance' label={`€ ${selectedWallet?.money || "No wallet"}`} />
                </DashboardSection>
                {/* Income/expense section */}
                <DashboardSection subtitle='Income/expenses' description='Track how much money you earn and spend every month'>
                    <div className="w-full flex justify-between gap-4">
                        <div className="w-full flex flex-col gap-2 bg-white shadow-lg rounded-xl px-4 py-6">
                            <div className='flex justify-between'>
                                <p className="text-[2.25rem]">IN</p>
                                <img className="rotate-180" src={require("../assets/icons/short_up.svg").default} alt="arrow-up-icon" />
                            </div>
                            <Subtitle subtitle={`€ ${income}`} />
                            <Description description={`This number shows how much money you earned this month starting from 01/${new Date(Date.now()).getMonth() + 1}/${new Date(Date.now()).getFullYear()}`}/>
                        </div>
                        <div className="w-full flex flex-col gap-2 bg-white shadow-lg rounded-xl px-4 py-6">
                            <div className='flex justify-between'>
                                <p className="text-[2.25rem]">OUT</p>
                                <img src={require("../assets/icons/short_up.svg").default} alt="arrow-up-icon" />
                            </div>
                            <Subtitle subtitle={`€ ${expense}`} />
                            <Description description={`This number illustrates the amount of money you spent this month starting from 01/${new Date(Date.now()).getMonth() + 1}/${new Date(Date.now()).getFullYear()}`}/>
                        </div>
                    </div>
                </DashboardSection>
                {/* Last expenses */}
                <DashboardSection subtitle='Your incomes/expenses divided in categories' description='Check how much you spend or receive by category'>
                    <CategoryExpenses />
                </DashboardSection>
                {/* Last transactions */}
                <DashboardSection subtitle='Last transactions' description='History of the last transactions'>
                    <LatestTransactionsSection />
                </DashboardSection>
            </div>


        </UserPage>
    );
}

const CategoryExpenses = () => {
    const {transactions, categories} = useContext(AppContext);

    // Money per category
    type MoneyCategory = {[key: string]: number};
    const [moneyByCategory, setMoneyByCategory] = useState<MoneyCategory>({});

    const calculateMoneyByCategory = (transactions: Transaction[], categories: Category[]) => {
        for (let c of categories) moneyByCategory[c.name] = 0;
        for (let t of transactions) moneyByCategory[t.category] = moneyByCategory[t.category] + (t.type === TransactionType.EXPENSE ? -t.money : t.money);

        setMoneyByCategory(moneyByCategory);
    }

    useEffect(() => {
        calculateMoneyByCategory(transactions, categories);
    }, [transactions, categories]);

    return (
        <div className="overflow-y-scroll grid grid-flow-row grid-cols-2 gap-2">
            {categories.map((c: Category, i) => <div key={i} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <p>{c.name}</p>
                    </div>
                    <p className="text-[2.25rem]">€ {moneyByCategory[c.name]}</p>
                </div>
                {/* <Description description={` ${c.name.toLowerCase()}`}/> */}
            </div> )}                   
        </div>
    );
}

const LatestTransactionsSection = () => {
    
    const {transactions} = useContext(AppContext);
   
    const [lastTransactions, setLastTransactions] = useState<Transaction[]>([]); 
    
    useEffect(() => {
        // 1. Take all transactions
        // 2. Sort them in reverse order
        // 3. Slice the obtained array to get the last 10
        setLastTransactions(transactions.sort((a: Transaction, b: Transaction) => b.date.getTime() - a.date.getTime()).slice(0, 10));
    }, [transactions]);

    return (  
        <div className="w-full bg-white rounded-lg shadow-lg px-8 py-4 h-[320px] overflow-y-scroll">
            <ul className="">
                {lastTransactions.map((t: Transaction, i) => {                    
                    return <li key={i}>
                            <div className="flex justify-center items-center gap-8">
                                <div className="relative w-[2rem] h-[2rem]">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5rem] h-[1.5rem] rounded-full" style={{backgroundColor: calculateColor(t.type), opacity: 0.2}}>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.8rem] h-[0.8rem] rounded-full" style={{backgroundColor: calculateColor(t.type)}}>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-center items-start gap-1">
                                    <p className=''>{t.description}</p>
                                    <small className="text-secondary">{t.date.toDateString()}</small>
                                </div>
                                <div className="relative w-[5rem] flex justify-end">
                                    <p className="weight-800" style={{color: calculateColor(t.type)}}>
                                        {t.type === "expense" ? "-" : "+"}{t.money}€
                                    </p>
                                </div>
                            </div>

                            <Spacer height="1rem"/>
                            <Line color="#F2F3F7"/>
                        </li>   
                })}
            </ul>
        </div>
    );
}

export default Dashboard;