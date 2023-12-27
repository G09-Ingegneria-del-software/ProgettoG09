// Importing libraries
import React, {useEffect, useState, useContext} from "react"
import axios from "axios";

// Importing pages
import UserPage from './UserPage';

// Importing components
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from "../components/common/Spacer";
import { ButtonIcon, ButtonText } from "../components/common/Button";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import PopoverText from "../components/common/Popover";

// Importing types
import { Transaction, TransactionValues, Comparator, Wallet, TransactionType, Budget } from "../type";
import InputText from "../components/common/InputText";

// Importing static stuff
import { K } from "../K";

// Importing context
import AuthContext from "../authContext";
import AppContext from "../appContext";
import { addUnderscore, getRequestHeaders } from "../utils";
import TransactionCard from "../components/TransactionCard";

const Transactions = () => {

    // Using context
    const { user } = useContext(AuthContext);
    const { allTransactions, setAllTransactions, transactions, setTransactions, wallets, setWallets, categories, budgets, setBudgets } = useContext(AppContext);

    const [curTransactions, setCurTransactions] = useState<Transaction[]>(transactions);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false); // opens popup on click of "Add transaction"

    // Transaction state
    const [type, setType] = useState<string>(TransactionType.EXPENSE);
    const [description, setDescription] = useState<string>("");
    const [money, setMoney] = useState<number>(0);
    const [selectedWalletName, setSelectedWalletName] = useState<string>(wallets[0]?.name || "No wallet specified");
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>(categories[0]?.name || "No category specified");

    useEffect(() => {
        setTransactions ? setTransactions(allTransactions) : console.log("setTransactions is undefined"); 
        setCurTransactions(allTransactions);
    }, [allTransactions]);

    const handleCreateTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const {token, headers} = getRequestHeaders();
        if (token) {
            const transactionData = {
                user: user?.email || "",
                category: addUnderscore(selectedCategoryName),
                wallet: addUnderscore(selectedWalletName),
                type,
                money: Number(money),
                description: description,
            }

            axios.post(process.env.REACT_APP_API_URI + "/api/transaction", transactionData, {headers})
                .then(res => {
                    // Update transactions
                    const transaction = res.data;
                    transaction.money = transactionData.money;
                    transaction.id = transaction._id;
                    delete transaction.__v; delete transaction._id;
                    transaction.date = new Date(transaction.date);
                    setAllTransactions ? setAllTransactions([...allTransactions, transaction]) : console.log("setAllTransactions is undefined");

                    // Update wallet
                    const wallet = wallets.find((w: Wallet) => w.name === selectedWalletName);
                    if (wallet) {
                        const walletIndex: number = wallets.indexOf(wallet);
                        wallets[walletIndex].money += (transaction.type === TransactionType.INCOME ? Number(transaction.money) : -Number(transaction.money));
                        setWallets ? setWallets([...wallets]) : console.log("setWallets is undefined");
                    }

                    // Update budget
                    const filteredBudgets = budgets.filter((b: Budget) => b.category === selectedCategoryName);
                    if (filteredBudgets) {
                        for (let budgetIndex = 0; budgetIndex < budgets.length; budgetIndex++) {
                            if (budgets[budgetIndex].actualMoney-Number(transaction.money) < 0)
                                alert(`Attention! Exceeding your ${transaction.category.toLowerCase()} budget`)
                            budgets[budgetIndex].actualMoney += (transaction.type === TransactionType.INCOME ? Number(transaction.money) : -Number(transaction.money));
                        }
                        setBudgets ? setBudgets([...budgets]) : console.log("setBudgets is undefined");
                    }

                    // Close the add modal popup
                    setAddModalOpen(!addModalOpen);
                })
                .catch(err => console.log(err.message))
        }
    }

    return (  
        <UserPage>
            {/* Add transaction modal */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add transaction" description="Insert values for all fields to create a transaction" buttonLabel="Add" onSubmitClick={handleCreateTransaction}>
                <div className="flex flex-col justify-start gap-4">
                    <Select label="Type" data={K.transactionTypes} value={type} onChange={setType}/>
                    <InputText label="Description" value={description} setValue={setDescription} />
                    <InputText label="Amount" value={money.toString()} setValue={setMoney} />
                    <Select label="Wallet" data={wallets.map(({name}) => name)} value={selectedWalletName} onChange={setSelectedWalletName}/>
                    <Select label="Category" data={categories.map(({name}) => name)} value={selectedCategoryName} onChange={setSelectedCategoryName}/>
                    {/* <div className="flex flex-col gap-1">
                        <label className="text-secondary">Date</label>
                        <div className="focus:outline-none border-1 border-secondary">
                            <Datepicker primaryColor="indigo" value={date} onChange={setDate} />
                        </div>
                    </div> */}
                </div> 
            </Modal>

            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Transactions" />
                    <Description description="Welcome to the Transactions page where you can view all your incomes and expense."/>
                </div>
                <ButtonIcon text="Add transaction" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>
            
            <Spacer height="2rem"/>

            <div className="flex flex-col">
                {/* Tool bar for searching, sorting, filtering and exporting */}
                <div className="flex justify-between items-center gap-4">
                    <SearchBar transactions={transactions} curTransactions={curTransactions} setCurTransactions={setCurTransactions}/>
                    {/* <ButtonIcon text="Export" color="active" iconSrc={require("../assets/icons/file_blank_fill.svg").default}/> */}
                </div>

                <Spacer height="2rem" />

                {/* Table */}
                <TransactionTable curTransactions={curTransactions} setCurTransactions={setCurTransactions}/>

            </div>
            

        </UserPage>
    );
}

type TransactionTableProps = {
    curTransactions: Transaction[],
    setCurTransactions: (t: Transaction[]) => void
}
const TransactionTable: React.FC<TransactionTableProps> = ({curTransactions, setCurTransactions}: TransactionTableProps) => {

    const limit: number = 5;

    let [curPage, setCurPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(curTransactions);

    useEffect(() => {
        setNumPages(Math.ceil(curTransactions?.length/limit));
        setVisibleTransactions(curTransactions?.slice((curPage-1)*limit, (curPage)*limit));
    }, [curTransactions, curPage]);

    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
            <div className="h-[550px]">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead className="rounded-lg">
                        <tr className="">
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Type
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Description
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Category 
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Date
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Amount
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Edit
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {visibleTransactions?.map(({id, type, description, category, wallet, money, date}: Transaction, i) => {
                            const rowStyles = "border-b-[1px] relative border-main-100";
                            return <tr className={i % 2 === 0 ? rowStyles : rowStyles + " bg-gray-100"} style={{ width: '100%' }} key={i}>
                                <TransactionCard id={id} type={type} description={description} category={category} wallet={wallet} money={money} date={date}/>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

                <Spacer height="2rem"/>

                {/* Pagination component */}
                <div className="flex justify-center items-center">
                    <ul className="w-1/2 flex justify-center gap-[4rem] bg-white rounded-lg">
                        {
                            [...Array(numPages)].map((_, i) => {
                                return <li key={i} className="">
                                    <ButtonText handleClick={() => setCurPage(i+1)} text={(i+1).toString()} color={i+1 === curPage ? "active" : "white"} />
                                </li>
                            })
                        }
                        
                    </ul>
                </div>
        </div>
    );
}

type SearchBarProps = {
    transactions: Transaction[],
    curTransactions: Transaction[],
    setCurTransactions: (t: Transaction[]) => void
}
const SearchBar: React.FC<SearchBarProps> = ({transactions, curTransactions, setCurTransactions}) => {

    const sortByList: Comparator[] = [
        {label: "Sort by...", tag: "sort_by"},
        {label: "Date", tag: "date"},
        {label: "Amount", tag: "amount"},
        // {label: "Category", tag: "category"},
    ]
    const filterByList: Comparator[] = [
        {label: "Filter by...", tag: "filter_by"},
        {label: "Date", tag: "date"},
        {label: "Amount", tag: "amount"},
        {label: "Category", tag: "category"},
        {label: "Type", tag: "type"},
    ]

    const [sortBy, setSortBy] = useState<Comparator>(sortByList[0]); // used in select
    const [typeFilter, setTypeFilter] = useState<string>(TransactionValues.ALL); // used in select
    const [startDateFilter, setStartDateFilter] = useState<Date>(); // used in select
    const [endDateFilter, setEndDateFilter] = useState<Date>(); // used in select
    const [amountFilter, setAmountFilter] = useState<string>(""); // used in select

    const searchIconSrc: string = require("../assets/icons/search.svg").default;

    const filterByDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        let substring: string = e.currentTarget.value;
        if (substring !== "") {        
            setCurTransactions(
                transactions.filter((t: Transaction) => t.description.toLowerCase().includes(substring))
            );
        } else {
            setCurTransactions(transactions);
        }
    }

    const handleSortByChange = (value: string) => {
        const newSortByStr = value.split(' ')[0].toLowerCase();
        const newSortBy = sortByList.find(cmp => cmp.tag === newSortByStr) || sortByList[0];
        setSortBy(newSortBy);

        switch (newSortBy.tag) {
            case "date":
                curTransactions.sort((a: Transaction, b: Transaction) => a.date.getTime() - b.date.getTime());
                break;
            case "amount":
                curTransactions.sort((a: Transaction, b: Transaction) => a.money - b.money);
                break;
        }

        setCurTransactions([...curTransactions]);
    }

    const handleFilterByChange = (typeFilter: string, startDateFilter: Date | null, endDateFilter: Date | null, amountFilter: string) => {
        // Type filtering
        if (typeFilter != TransactionValues.ALL) {
            curTransactions = transactions.filter((t: Transaction) => t.type === typeFilter);
        } else {
            curTransactions = transactions;
        }

        // Date filtering
        if (startDateFilter && endDateFilter) {
            curTransactions = transactions.filter((t: Transaction) => t.date >= new Date(startDateFilter) && t.date <= new Date(endDateFilter));
        }

        // Amount filtering
        if (amountFilter != "") { 
            curTransactions = transactions.filter((t: Transaction) => t.money >= parseFloat(amountFilter));
        }

        setCurTransactions([...curTransactions]);
    }

    useEffect(() => {
        handleFilterByChange(typeFilter, startDateFilter ?? null, endDateFilter ?? null, amountFilter);
    }, [typeFilter, startDateFilter, amountFilter]);

    return (
        <div className="relative px-4 flex-1 h-16 bg-white flex justify-between items-center rounded-xl shadow-lg">
                <div className="relative mr-2">
                    <img className="" src={searchIconSrc}/>
                </div>
                <div className='flex-1 h-full flex items-center justify-center'>
                    <input onChange={filterByDescription} type="text" id='searchText' placeholder="Search for transactions..." className="w-full h-full outline-none focus:border-b-active"/>
                </div>
                
                <div className="flex justify-end items-center gap-4">
                    {/* Sort by */}
                    <Select data={sortByList.map(item => item.label)} value={sortBy.label} onChange={handleSortByChange} />

                    {/* Filter by */}
                    <PopoverText typeValue={typeFilter} setTypeValue={setTypeFilter} startDate={startDateFilter ?? null} setStartDate={setStartDateFilter} endDate={endDateFilter ?? null} setEndDate={setEndDateFilter} amountValue={amountFilter} setAmountValue={setAmountFilter} />
                </div>

        </div>
    );
}
 
export default Transactions;