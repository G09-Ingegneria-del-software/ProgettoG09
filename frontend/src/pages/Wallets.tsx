// Importing pages
import React, { useState, useContext } from 'react';
import UserPage from './UserPage';
import WalletCard from '../components/WalletCard';

// Importing components
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from '../components/common/Spacer';
import { ButtonIcon } from '../components/common/Button';
import Modal from '../components/common/Modal';

// Importing context
import AppContext from '../appContext';

const Wallets = () => {

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
    const {wallets, setWallets} = useContext(AppContext);

    // const walletCards = Object.entries(Portfolio).map(([walletKey, walletData]) =>(
    //     <WalletCard key = {walletKey} name = {walletData.name} balance = {walletData.balance} color ={walletData.color}/>
    // ));
    // const maxCardsPerRow = 3;
    // let cardsInCurrentRow =0;

    const handleCreateTransaction = () => {
        
    }

    return (
        <UserPage >
            {/* Add transaction modal */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add wallet" description="Insert values for all fields to create a wallet" buttonLabel="Add" onSubmitClick={handleCreateTransaction}>
                {/* TODO: add content here */}
            </Modal>

            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Wallets" />
                    <Description description="Find and manage all your wallets"/>
                </div>
                <ButtonIcon text="Add wallet" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>
            <Spacer height="2em"/>
            <section className= "grid grid-rows-2 pt-5"> {/* Non serve aggiornare il numero di colonne, esiste grid :) */}
                {wallets.map(({name, money, description, categories}, index) => {
                    return <WalletCard key={index} name={name} money={money} description={description} />;
                    // Aggiorna il conteggio delle card nella riga corrente
                    // cardsInCurrentRow++;

                    // // Se abbiamo raggiunto il massimo di card per riga, inizia una nuova riga
                    // if (cardsInCurrentRow > maxCardsPerRow) {
                    //     cardsInCurrentRow = 1; // Riporta il conteggio a 1 per la nuova riga
                    //     return (
                    //     <React.Fragment key={index}>
                    //         <div className="w-full"> <Spacer height="2em"/>
                    //             {card}
                    //         </div> {/* Aggiunge uno spazio per iniziare una nuova riga */}
                            
                    //     </React.Fragment>
                    //     );
                    // } else {
                    // // Continua con la card nella riga corrente
                    //     return (
                    //     <div key={index} style={{ marginRight: "2em" }}>
                    //         {card}
                    //     </div>
                    //     );
                    // }
                })}
            </section>
        </UserPage>
    );
}
 
export default Wallets;