// Importing libraries
import {useState} from "react"

// Importing pages
import UserPage from './UserPage';

// Importing components
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from "../components/common/Spacer";
import { ButtonIcon } from "../components/common/Button";

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
        {type: {text: "expense", color: "red"}, description: "Spesa al supermercato", money: {amount: 500, currency: Currency.EUR}, date: new Date(Date.now())},
        {type: {text: "income", color: "lime"}, description: "Stipendio", money: {amount: 10500, currency: Currency.JPY}, date: new Date(Date.now())},
        {type: {text: "expense", color: "red"}, description: "Pagamento mensile palestra", money: {amount: 12345, currency: Currency.USD}, date: new Date(Date.now())},
    ]

    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-8">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="flex justify-start items-center">
                        <th> </th>
                        <th><h2>Description</h2></th>
                        <th><h2>Date</h2></th>
                        <th><h2>Amount</h2></th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(({type, description, money, date}: Transaction, i) => {

                        return <tr className="flex justify-start items-center">
                            <td> 
                                <div className="relative w-[2rem] h-[2rem]">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2rem] h-[2rem] rounded-full" style={{backgroundColor: type.color, opacity: 0.2}}>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] rounded-full" style={{backgroundColor: type.color}}>
                                    </div>
                                </div>
                            </td>
                            <td>{description}</td>
                            <td className="text-secondary">{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</td>
                            <td style={{color: type.color}}>{type.text === "expense" ? "-" : ""}{money.amount}</td>
                            <td>
                                <ButtonIcon iconSrc={require("../assets/icons/edit.svg").default} text="" color="white"/>
                            </td>
                            <Spacer width="1rem"/>
                            <td>
                                <ButtonIcon iconSrc={require("../assets/icons/trash.svg").default} text="" color="white"/>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
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