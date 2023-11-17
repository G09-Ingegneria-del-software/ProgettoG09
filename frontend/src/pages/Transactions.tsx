// Importing libraries
import {useEffect, useState} from "react"

// Importing pages
import UserPage from './UserPage';

// Importing components
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from "../components/common/Spacer";
import { ButtonIcon, ButtonText } from "../components/common/Button";

// Importing types
import { Currency, Transaction } from "../type";

const Transactions = () => {
    return (  
        <UserPage>
            <Title title="Transactions" />
            <Description description="Last transaction addeed 2d ago"/>
            
            <Spacer height="2rem"/>

            <div className="flex flex-col">
                {/* Tool bar for searching, sorting, filtering and exporting */}
                <div className="flex justify-between items-center gap-4">
                    <SearchBar />
                    <ButtonIcon text="Export" color="active" iconSrc={require("../assets/icons/file_blank_fill.svg").default}/>
                </div>

                <Spacer height="2rem" />

                {/* Table */}
                <TransactionTable />

            </div>
            

        </UserPage>
    );
}

const TransactionTable = () => {

    const transactions: Transaction[] = [
        {type: {text: "expense", color: "red"}, description: "Spesa al supermercato con Ivano da 500000 euro, voglio una bugatti", money: {amount: 500, currency: Currency.EUR}, date: new Date(Date.now())},
        {type: {text: "income", color: "lime"}, description: "Stipendio", money: {amount: 10500, currency: Currency.JPY}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
    ]

    const limit: number = 5;

    const [curPage, setCurPage] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);
    const [curTransactions, setCurTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        setCurTransactions(transactions.slice((curPage-1)*limit, (curPage)*limit));
        setNumPages(Math.round(transactions.length/limit + 1));
    }, [curPage]);

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
                        {curTransactions.map(({ type, description, money, date }: Transaction, i) => {
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
                                    <ButtonText handleClick={() => setCurPage(i+1)} text={(i+1).toString()} color="white" />
                                </li>
                            })
                        }
                        
                    </ul>
                </div>
        </div>
    );
}

const SearchBar = () => {

    const searchIconSrc: string = require("../assets/icons/search.svg").default;
    
    const sortByList: string[] = [
        "Sort by...",
        "Date",
        "Amount",
        "Category"
    ]
    const filterByList: string[] = [
        "Filter by...",
        "Date",
        "Amount",
        "Category",
        "Type"
    ]

    const [sortBy, setSortBy] = useState<string>(sortByList[0]);
    const [filterBy, setFilterBy] = useState<string>(filterByList[0]);

    return (
        <div className="relative flex-1 h-16 bg-white flex justify-between items-center rounded-xl shadow-lg">
                <div className="relative px-4">
                    <img className="" src={searchIconSrc}/>
                </div>
                <div className='flex-1 h-full flex items-center justify-center'>
                    <input type="text" id='searchText' placeholder="Search for transactions..." className="w-full h-full outline-none focus:border-b-active"/>
                </div>
                
                {/* Sort by */}
                <select onChange={e => setSortBy(e.target.value)} value={sortBy} id="sortBy" name="sortBy" className="bg-[#E9ECFF] rounded-md text-secondary w-[150px] px-2 py-2 my-1 mx-4" >
                    {sortByList.map((s, i) => <option key={i} disabled={i === 0} >{s}</option>)}
                </select>

                {/* Filter by */}
                <select onChange={e => setFilterBy(e.target.value)} value={filterBy} id="filterBy" name="filterBy" className="bg-[#E9ECFF] rounded-md text-secondary w-[150px] px-2 py-2 my-1 mr-4" >
                    {filterByList.map((s, i) => <option key={i} disabled={i === 0} >{s}</option>)}
                </select>


        </div>
    );
}
 
export default Transactions;