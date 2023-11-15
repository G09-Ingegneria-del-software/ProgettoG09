// Importing pages
import UserPage from './UserPage';

// Importing components
import Title from "../components/common/Title";
import Description from '../components/common/Description';
import {ButtonIcon} from '../components/common/Button';

const Dashboard = () => {
    return (
        <UserPage>
            <Title title="Dashboard" />
            <Description description="Updated 12 hrs ago"/>
            <ButtonIcon text="Add transaction" color="active" iconSrc={require("../assets/icons/credit_card.svg").default}/>
        </UserPage>
    );
}

export default Dashboard;