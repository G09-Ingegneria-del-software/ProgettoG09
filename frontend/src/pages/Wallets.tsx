// Importing pages
import React, { useState, useContext } from 'react';
import UserPage from './UserPage';
import axios from 'axios';

// Importing components
import WalletCard from '../components/WalletCard';
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from '../components/common/Spacer';
import { ButtonIcon } from '../components/common/Button';
import Modal from '../components/common/Modal';
import InputText from '../components/common/InputText';

// Importing context
import AuthContext from '../authContext';
import AppContext from '../appContext';

// Improting utils
import { addUnderscore, getRequestHeaders, removeUnderscore } from '../utils';

const Wallets = () => {

    // Contexts
    const { user } = useContext(AuthContext);
    const { wallets, setWallets } = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // Create wallet state
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [money, setMoney] = useState<number>(0);

    // Create wallet
    const handleCreateWallet = () => {
        const {token, headers} = getRequestHeaders();

        const wallet = {
            user: user?.email || "",
            name: addUnderscore(name),
            description,
            money,
            categories: []
        }

        if (token) {
            axios.post(process.env.REACT_APP_API_URI + "/api/wallet", wallet, {headers})
                .then(res => {
                    const newWallet = res.data;
                    newWallet.name = removeUnderscore(newWallet.name);
                    setWallets ? setWallets([newWallet, ...wallets]) : console.log("setWallets is undefined");
                    setAddModalOpen(!addModalOpen);
                })
                .catch(err => console.log(err.message))
        }
    }

    return (
        <UserPage >
            {/* Add wallets modal */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add wallet" description="Insert values for all fields to create a wallet" buttonLabel="Add" onSubmitClick={handleCreateWallet}>
                <div className="flex flex-col justify-start gap-4">
                    <InputText label="Name" value={name} setValue={setName} />
                    <InputText label="Description" value={description} setValue={setDescription} />
                    <InputText label="Balance" value={money.toString()} setValue={setMoney} />
                </div> 
            </Modal>

            
            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Wallets" />
                    <Description description="Find and manage all your wallets"/>
                </div>
                <ButtonIcon text="Add wallet" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>
            <Spacer height="2em"/>
            <section className= "w-full grid grid-cols-2 place-items-center gap-4">
                {wallets?.map(({id, name, money, description}, index) => <WalletCard key={index} id={id} name={name} money={money} description={description} />)}
            </section>
        </UserPage>
    );
}
 
export default Wallets;