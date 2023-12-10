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
import Select from '../components/common/Select';
import InputText from '../components/common/InputText';

// Importing context
import AppContext from '../appContext';

const Wallets = () => {

    // App context
    const {user, wallets, setWallets} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // Wallet state
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [money, setMoney] = useState<number>(0);

    const handleCreateWallet = () => {
        const token = localStorage.getItem("token") || "";
        const configRequest = {"Content-type": "application/json", "x-access-token": token};

        const wallet = {
            user: user ? user.email : "mario.rossi@gmail.com",
            name,
            description,
            money,
            categories: []
        }

        if (token) {
            axios.post("/api/wallet", wallet, {headers: configRequest})
                .then(res => {
                    setAddModalOpen(!addModalOpen);
                })
                .catch(err => console.log(err.message))
        }
    }

    return (
        <UserPage >
            {/* Add transaction modal */}
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
                {wallets.map(({name, money, description}, index) => <WalletCard key={index} name={name} money={money} description={description} />)}
            </section>
        </UserPage>
    );
}
 
export default Wallets;