// Importing libraries
import { useState, useEffect } from "react"

// Importing pages
import UserPage from './UserPage';

// Importing components
import DashboardSection from '../components/DashboardSection';
import Title from "../components/common/Title";
import Description from '../components/common/Description';
import {ButtonIcon} from '../components/common/Button';
import Card from "../components/Card"
import Subtitle from '../components/common/Subtitle';

import Line from "../components/common/Line";
import Spacer from "../components/common/Spacer";

// Importing types
import { Transaction, Currency } from '../type';

const Dashboard = () => {
    return (
        <UserPage>
            <Title title="Dashboard" />
            <Description description="Updated 12 hrs ago"/>

            <Spacer height="2rem"/>

            <div className="grid grid-rows-flow grid-cols-2 gap-12">
                {/* Balance section */}
                <DashboardSection subtitle='Balance' description='Everything about your balance on the account'>
                    <Card description='Your current balance' label='€ 1234567.89' />
                </DashboardSection>
                {/* Income/expense section */}
                <DashboardSection subtitle='Income/expenses' description='Track how much money you earn and spend'>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-[180px] bg-white shadow-lg rounded-xl px-4 py-6">
                            <div className='flex justify-between'>
                                <p className="text-[2.25rem]">IN</p>
                                <img src={require("../assets/icons/short_up.svg").default} alt="arrow-up-icon" />
                            </div>
                            <Subtitle subtitle='€ 1920.56' />
                            <Description description='Lorem ipsum dolor sit amet consectetur.'/>
                        </div>
                        <div className="flex flex-col gap-2 w-[180px] bg-white shadow-lg rounded-xl px-4 py-6">
                            <div className='flex justify-between'>
                                <p className="text-[2.25rem]">OUT</p>
                                <img className="rotate-180" src={require("../assets/icons/short_up.svg").default} alt="arrow-up-icon" />
                            </div>
                            <Subtitle subtitle='€ 420.123' />
                            <Description description='Lorem ipsum dolor sit amet consectetur.'/>
                        </div>
                    </div>
                </DashboardSection>
                {/* Last expenses */}
                <DashboardSection subtitle='Expenses for the last 3 months' description='List of all transactions so far'>
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


    return (
        <div className="overflow-y-scroll grid grid-flow-row grid-cols-2 gap-2">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center gap-2">
                    <div className="flex flex-col justify-center items-center w-[3rem] h-[3rem] p-1 bg-slate-300 rounded-full">
                        <img src={require("../assets/icons/home_alt_fill.svg").default} alt="category-icon" />
                    </div>
                    <p className="text-[2.25rem]">€ 129.62</p>
                </div>
                <Description description='Spent on home accessories'/>
            </div>                        
        </div>
    );
}

const LatestTransactionsSection = () => {
    
   
    const [lastTransactions, setLastTransactions] = useState<Transaction[]>([]); 
    
    useEffect(() => {
        setLastTransactions([
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },
            {
                description: "Spesa da 500€ con Ivano", 
                type: {
                    text: "expense",
                    color: "red"
                }, 
                money: {amount: 500.00, currency: Currency.EUR}, 
                date: new Date(Date.now())
            },

        ]);
    }, []);

    return (  
        <div className="w-full bg-white rounded-lg shadow-lg px-8 py-4 h-[320px] overflow-y-scroll">
            <ul className="">
                {lastTransactions.map(({description, money, type, date}: Transaction, i) => {
                    const {color} = type;
                    
                    return <li key={i}>
                            <div className="flex justify-between items-center gap-2">
                                <div className="relative w-[2rem] h-[2rem]">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2rem] h-[2rem] rounded-full" style={{backgroundColor: color, opacity: 0.2}}>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] rounded-full" style={{backgroundColor: color}}>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-start gap-1">
                                    <p className=''>{description}</p>
                                    <small className="text-secondary">{date.toDateString()}</small>
                                </div>
                                <div className="">
                                    <p className="weight-800" style={{color: color}}>
                                        {type.text === "expense" ? "-" : "+"}{money.amount}€
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