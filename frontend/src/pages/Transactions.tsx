// Importing libraries
import React, {useEffect, useState} from "react"

// Importing pages
import UserPage from './UserPage';

// Importing components
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from "../components/common/Spacer";
import { ButtonIcon, ButtonText } from "../components/common/Button";

// Importing types
import { Currency, Transaction, Comparator } from "../type";

const Transactions = () => {

    const [transactions, setTransactions] = useState<Transaction[]>([
        {type: {text: "expense", color: "red"}, description: "Spesa al supermercato con Ivano da 500000 euro, voglio una bugatti", money: {amount: 500, currency: Currency.EUR}, date: new Date(Date.now())},
        {type: {text: "income", color: "lime"}, description: "Stipendio", money: {amount: 10500, currency: Currency.JPY}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
    ]);

    const [curTransactions, setCurTransactions] = useState<Transaction[]>(transactions);

    const sortByList: Comparator[] = [
        {label: "Sort by...", tag: "sort_by"},
        {label: "Date", tag: "date"},
        {label: "Amount", tag: "amount"},
        {label: "Category", tag: "category"},
    ]
    const filterByList: Comparator[] = [
        {label: "Filter by...", tag: "filter_by"},
        {label: "Date", tag: "date"},
        {label: "Amount", tag: "amount"},
        {label: "Category", tag: "category"},
        {label: "Type", tag: "type"},
    ]

    const [sortBy, setSortBy] = useState<string>(sortByList[0].tag); // used in select
    const [filterBy, setFilterBy] = useState<string>(filterByList[0].tag); // used in select

    // const [comparatorType]

    useEffect(() => {
        // Applying filter
        // transactions.filter((t: Transaction) => t[filterBy] === "26/09/2023");

        // Applying sorting
        // transactions.sort((a, b) => (a[sortBy] as unknown as number) - (b[sortBy] as unknown as number));
        
        // console.log(transactions);

        // setTransactions(transactions);

    }, [sortBy, filterBy]);

    return (  
        <UserPage>
            <Title title="Transactions" />
            <Description description="Last transaction addeed 2d ago"/>
            
            <Spacer height="2rem"/>

            <div className="flex flex-col">
                {/* Tool bar for searching, sorting, filtering and exporting */}
                <div className="flex justify-between items-center gap-4">
                    <SearchBar sortBy={sortBy} setSortBy={setSortBy} sortByList={sortByList} filterBy={filterBy} setFilterBy={setFilterBy} filterByList={filterByList} transactions={transactions} curTransactions={curTransactions} setCurTransactions={setCurTransactions}/>
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

    const [curPage, setCurPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);

    const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>(curTransactions);


    useEffect(() => {
        setVisibleTransactions(curTransactions.slice((curPage-1)*limit, (curPage)*limit));
        setNumPages(Math.ceil(curTransactions.length/limit));
    }, [curPage, curTransactions]);

    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
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

                    <tbody className="">
                        {visibleTransactions.map(({ type, description, money, date }: Transaction, i) => {
                            return <tr key={i}>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-main">
                                    <div className="relative w-[1.5rem] h-[1.5rem]">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5rem] h-[1.5rem] rounded-full" style={{ backgroundColor: type.color, opacity: 0.2 }}>
                                        </div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.8rem] h-[0.8rem] rounded-full" style={{ backgroundColor: type.color }}>
                                        </div>
                                    </div>
                                </th>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4"><p className="w-[300px] leading-8 whitespace-normal line-clamp-2">{description}</p></td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-secondary">{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" style={{ color: type.color }}>{type.text === "expense" ? "-" : ""}{money.amount}</td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <ButtonIcon iconSrc={require("../assets/icons/edit.svg").default} text="" color="white" />
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                    <ButtonIcon iconSrc={require("../assets/icons/trash.svg").default} text="" color="white" />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

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
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    sortByList: Comparator[],
    filterBy: string,
    setFilterBy: React.Dispatch<React.SetStateAction<string>>,
    filterByList: Comparator[],
    transactions: Transaction[],
    curTransactions: Transaction[],
    setCurTransactions: (t: Transaction[]) => void
}
const SearchBar: React.FC<SearchBarProps> = ({sortBy, setSortBy, sortByList, filterBy, setFilterBy, filterByList, transactions, curTransactions, setCurTransactions}) => {

    const searchIconSrc: string = require("../assets/icons/search.svg").default;

    const filterByDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        let substring: string = e.currentTarget.value;
        if (substring !== "") {        
            setCurTransactions(
                curTransactions.filter((t: Transaction) => t.description.toLowerCase().includes(substring))
            );
        } else {
            setCurTransactions(transactions);
        }
    }

    return (
        <div className="relative flex-1 h-16 bg-white flex justify-between items-center rounded-xl shadow-lg">
                <div className="relative px-4">
                    <img className="" src={searchIconSrc}/>
                </div>
                <div className='flex-1 h-full flex items-center justify-center'>
                    <input onChange={filterByDescription} type="text" id='searchText' placeholder="Search for transactions..." className="w-full h-full outline-none focus:border-b-active"/>
                </div>
                
                {/* Sort by */}
                <select onChange={e => setSortBy(e.target.value)} value={sortBy} id="sortBy" name="sortBy" className="bg-[#E9ECFF] rounded-md text-secondary w-[150px] px-2 py-2 my-1 mx-4" >
                    {sortByList.map(({label}, i) => <option key={i} disabled={i === 0} >Sort by {label}</option>)}
                </select>

                {/* Filter by */}
                <select onChange={e => setFilterBy(e.target.value)} value={filterBy} id="filterBy" name="filterBy" className="bg-[#E9ECFF] rounded-md text-secondary w-[150px] px-2 py-2 my-1 mr-4" >
                    {filterByList.map(({label}, i) => <option key={i} disabled={i === 0} >Filter by {label}</option>)}
                </select>


        </div>
    );
}
 
export default Transactions;