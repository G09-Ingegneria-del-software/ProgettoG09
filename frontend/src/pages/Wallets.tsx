// Importing pages
import React from 'react';
import UserPage from './UserPage';
import WalletCard from '../components/WalletCard';

import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Spacer from '../components/common/Spacer';

const Portfolio = {
    //color : 0 = blue | 1 = orange
    "Wallet1": {"name" : "American express", "balance" : "20000.24", "color": "0"},
    "Wallet2": {"name" : "American express gold platinum + premium", "balance" : "41232.24", "color": "1" },
    "Wallet3": {"name" : "Paypal", "balance" : "512300.24", "color": "0" },
    "Wallet34": {"name" : "Swiss bank", "balance" : "2300.24", "color": "1" },
}

const Wallets = () => {
    const walletCards = Object.entries(Portfolio).map(([walletKey, walletData]) =>(
        <WalletCard key = {walletKey} name = {walletData.name} balance = {walletData.balance} color ={walletData.color}/>
    ));
    const maxCardsPerRow = 3;
    let cardsInCurrentRow =0;
    return (
        <UserPage >
            <Title title ="Wallets"/>
            <Description description="Last transaction addes 2h ago" />
            <Spacer height="2em"/>
            <section className= "pt-5 flex flex-wrap -mx-4">
                {walletCards.map((card, index) => {
                    // Aggiorna il conteggio delle card nella riga corrente
                    cardsInCurrentRow++;

                    // Se abbiamo raggiunto il massimo di card per riga, inizia una nuova riga
                    if (cardsInCurrentRow > maxCardsPerRow) {
                        cardsInCurrentRow = 1; // Riporta il conteggio a 1 per la nuova riga
                        return (
                        <React.Fragment key={index}>
                            <div className="w-full"> <Spacer height="2em"/>
                                {card}
                            </div> {/* Aggiunge uno spazio per iniziare una nuova riga */}
                            
                        </React.Fragment>
                        );
                    } else {
                    // Continua con la card nella riga corrente
                        return (
                        <div key={index} style={{ marginRight: "2em" }}>
                            {card}
                        </div>
                        );
                    }
                })}
            </section>
        </UserPage>
    );
}
 
export default Wallets;