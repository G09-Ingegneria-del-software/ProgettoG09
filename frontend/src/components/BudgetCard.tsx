// Improting libraries
import {useState, useContext, useEffect} from 'react'
import axios from 'axios';

// Importing components
import Modal from './common/Modal'; 
import Subtitle from './common/Subtitle';
import InputText from './common/InputText';
import Select from './common/Select';

// Importing types
import { Budget } from '../type';

// Importing contexts
import AuthContext from '../authContext';
import AppContext from '../appContext';

// Importing utils
import { getRequestHeaders, addUnderscore } from '../utils';


type BudgetCardProps = {
    id: string,
    name: string,
    description: string,
    initialMoney: number,
    actualMoney: number,
    category: string,
};

const BudgetCard:React.FC<BudgetCardProps> = ({id, name, description, initialMoney, actualMoney, category}: BudgetCardProps) => { 
    // Contexts
    const { user } = useContext(AuthContext);
    const { categories, budgets, setBudgets } = useContext(AppContext);
    
    // Edit wallet state
    const [newName, setNewName] = useState<string>(name);
    const [newDescription, setNewDescription] = useState<string>(description);
    const [newInitialMoney, setNewInitialMoney] = useState<number>(initialMoney);
    const [newActualMoney, setNewActualMoney] = useState<number>(actualMoney);
    const [newCategoryName, setNewCategoryName] = useState<string>(category);
    
    // Modal states
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    // Edit wallet
    const handleEditBudget = () => {

        const {token, headers} = getRequestHeaders();

        const budget = {
            user: user?.email || "",
            name: addUnderscore(newName),
            description: newDescription,
            initialMoney: newInitialMoney,
            actualMoney: newActualMoney,
            category: newCategoryName 
        };

        if (token) {
            axios.put(`/api/budget/${addUnderscore(name)}`, budget, {headers})
                .then(res => {
                    // Find budget to edit and update state
                    const budget = budgets?.find((b: Budget) => b.name === name);
                    if (budget) {
                        const index: number = budgets?.indexOf(budget);
                        budgets[index].name = newName;
                        budgets[index].description = newDescription;
                        budgets[index].initialMoney = newInitialMoney;
                        budgets[index].actualMoney = newActualMoney;
                        setBudgets ? setBudgets([...budgets]) : console.log("setBudgets is undefined");
                    }
                    setEditModalOpen(false);
                })
                .catch(err => console.log(err.message));
        }
    }

    const handleDeleteBudget = () => {
        const {token, headers} = getRequestHeaders();

        if (token) {
            axios.delete(`/api/budget/${user?.email || ""}/${addUnderscore(name)}`, {headers})
                .then(res => {
                    // Find budget to delete and update state
                    const budget = budgets?.find((b: Budget) => b.id === id);
                    if (budget) {
                        budgets.splice(budgets.indexOf(budget), 1);
                        setBudgets ? setBudgets([...budgets]) : console.log("setBudgets is undefined");
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
            <Modal open={editModalOpen} setOpen={setEditModalOpen} title="Edit transaction" description="In this section you'll be able to edit your transaction modifying type, description, money and date" buttonLabel="Save" onSubmitClick={handleEditBudget}>
                <div className="flex flex-col justify-start gap-4">
                    <InputText label="Name" value={newName} setValue={setNewName} />
                    <InputText label="Description" value={newDescription} setValue={setNewDescription} />
                    <InputText label="Initial amount" value={newInitialMoney.toString()} setValue={setNewInitialMoney} />
                    <InputText label="Actual amount" value={newActualMoney.toString()} setValue={setNewActualMoney} />
                    <Select label="Category" data={categories.map(({name}) => name)} value={newCategoryName} onChange={setNewCategoryName}/>
                </div> 
            </Modal>

            {/* Delete modal open */}
            <Modal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="Delete transaction" description="Are you sure you want to delete this transaction?" buttonLabel="Delete" onSubmitClick={handleDeleteBudget} />

            <div className={cardClasses}
            >
                <div className="absolute top-[-20px] right-[-20px] w-[140px] h-[140px] rounded-full bg-white opacity-10"></div>
                <div className="flex justify-between items-center">
                    <Subtitle subtitle={name} textColor='white'/>
                    <div className="relative z-10 flex gap-4 justify-between items-center">
                        <button className="w-[2rem] h-[2rem] bg-red" onClick={() => setEditModalOpen(true)}><img src={require("../assets/icons/edit.svg").default} alt="" /></button>
                        <button onClick={() => setDeleteModalOpen(true)}><img src={require("../assets/icons/trash.svg").default} alt="" /></button>
                    </div>
                </div>
                <p className="text-white opacity-70">{description}</p>
                <p className='text-[56px] font-thin'>€ {actualMoney} / {initialMoney}</p>
            </div>
        </>
    );
}

export default BudgetCard;