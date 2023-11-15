// Importing pages
import UserPage from './UserPage';

// Importing components
import DashboardSection from '../components/DashboardSection';
import Title from "../components/common/Title";
import Description from '../components/common/Description';
import {ButtonIcon} from '../components/common/Button';
import Card from "../components/Card"
import Subtitle from '../components/common/Subtitle';

const Dashboard = () => {
    return (
        <UserPage>
            <Title title="Dashboard" />
            <Description description="Updated 12 hrs ago"/>
            {/* <ButtonIcon text="Add transaction" color="active" iconSrc={require("../assets/icons/credit_card.svg").default}/> */}
            
            <div className="grid grid-rows-flow grid-cols-2 gap-20">
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
                    <div className="grid grid-flow-row grid-cols-2 gap-2">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex justify-between items-center gap-2">
                                <div className="flex flex-col justify-center items-center w-[3rem] h-[3rem] p-1 bg-slate-300 rounded-full">
                                    <img src={require("../assets/icons/home_alt_fill.svg").default} alt="category-icon" />
                                </div>
                                <p className="text-[2.25rem]">€ 129.62</p>
                            </div>
                            <Description description='Spent on home accessories'/>
                        </div>
                        
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
                </DashboardSection>
                {/* Last transactions */}
                <DashboardSection subtitle='Last transactions' description='History of the last transactions'>
                    <div className="flex flex-col gap-2">
                    </div>
                </DashboardSection>
            </div>


        </UserPage>
    );
}

export default Dashboard;