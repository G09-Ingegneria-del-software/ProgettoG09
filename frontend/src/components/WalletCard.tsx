// Importing libraries
import { useState, useContext } from 'react'
import axios from 'axios';

// Importing components
import Subtitle from './common/Subtitle';
import Modal from '../components/common/Modal';
import InputText from '../components/common/InputText';

// Importing types
import { Wallet } from '../type';

// Importing context
import AuthContext from '../authContext';
import AppContext from '../appContext';

// Importing utils
import { getRequestHeaders, addUnderscore } from '../utils';

type WalletProps = {
    id: string,
    name: string,
    money: number,
    description: string,
};

const WalletCard:React.FC<WalletProps> = ({id, name, description, money}: WalletProps) => {

    // Contexts
    const { user } = useContext(AuthContext);
    const { wallets, setWallets } = useContext(AppContext);
    
    // Edit wallet state
    const [newName, setNewName] = useState<string>(name);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [newMoney, setNewMoney] = useState<number>(money);
    
    // Modal states
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    // Edit wallet
    const handleEditWallet = () => {

        const {token, headers} = getRequestHeaders();

        const wallet = {
            user: user?.email || "",
            name: addUnderscore(newName),
            description: newDescription,
            money: newMoney,
        };

        if (token) {
            axios.put(`${process.env.REACT_APP_API_URI}/api/wallet/${addUnderscore(name)}`, wallet, {headers})
                .then(res => {
                    // Find wallet to edit and update state
                    const wallet = wallets?.find((w: Wallet) => w.id === id);
                    if (wallet) {
                        const index: number = wallets?.indexOf(wallet);
                        wallets[index].name = newName;
                        wallets[index].description = newDescription;
                        wallets[index].money = newMoney;
                        setWallets ? setWallets([...wallets]) : console.log("setWallets is undefined");
                    }
                    setEditModalOpen(false);
                })
                .catch(err => console.log(err.message));
        }
    }

    const handleDeleteWallet = () => {
        const {token, headers} = getRequestHeaders();

        if (token) {
            axios.delete(`${process.env.REACT_APP_API_URI}/api/wallet/${user?.email || ""}/${addUnderscore(name)}`, {headers})
                .then(res => {
                    // Find wallet to delete and update state
                    const wallet = wallets?.find((w: Wallet) => w.name === name);
                    if (wallet) {
                        wallets.splice(wallets.indexOf(wallet), 1);
                        setWallets ? setWallets([...wallets]) : console.log("setWallets is undefined");
                    }
                    setDeleteModalOpen(false);
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }

    const isSelected = true;
    const cardClasses = `relative flex flex-col overflow-hidden justify-between shadow-lg text-white bg-gradient-to-b ${isSelected ? 'bg-gradient-to-b from-[#1053FF] to-[#1DA0CA]' : 'bg-gradient-to-b from-[#ff9900] to-[#ffe486]'} w-[450px] h-[250px] max-w-[600px] max-h-[400px] rounded-[2rem] p-8`

    return (
        <>
            {/* Edit modal */}
            <Modal open={editModalOpen} setOpen={setEditModalOpen} title="Edit transaction" description="In this section you'll be able to edit your transaction modifying type, description, money and date" buttonLabel="Save" onSubmitClick={handleEditWallet}>
                <div className="flex flex-col justify-start gap-4">
                    <InputText label="Name" value={newName} setValue={setNewName} />
                    <InputText label="Description" value={newDescription} setValue={setNewDescription} />
                    <InputText label="Amount" value={newMoney.toString()} setValue={setNewMoney} />
                </div> 
            </Modal>

            {/* Delete modal open */}
            <Modal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="Delete transaction" description="Are you sure you want to delete this transaction?" buttonLabel="Delete" onSubmitClick={handleDeleteWallet} />

            <div className={cardClasses}
            >
                <div className="absolute top-[-20px] right-[-20px] w-[140px] h-[140px] rounded-full bg-white opacity-10"></div>
                <div className="flex justify-between items-center">
                    <Subtitle subtitle={name} textColor='white'/>
                    <div className="relative z-10 flex gap-4 justify-between items-center">
                        <button className="w-[2rem] h-[2rem] bg-red" onClick={() => setEditModalOpen(true)}><img src={require("../assets/icons/edit.svg").default} alt="" /></button>
                        <button onClick={() => {console.log(name); setDeleteModalOpen(true)}}><img src={require("../assets/icons/trash_white.svg").default} alt="" /></button>
                    </div>
                </div>
                <p className="text-white opacity-70">{description}</p>
                <p className='text-[56px] font-thin'>€ {money}</p>
            </div>
        </>
    );
}

export default WalletCard;