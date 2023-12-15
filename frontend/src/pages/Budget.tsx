
// Importing libraries
import {useState, useEffect, useContext } from "react"
import axios from "axios";

// Importing pages 
import UserPage from "./UserPage";

// Improting components
import Title from "../components/common/Title";
import Description from "../components/common/Description";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import InputText from "../components/common/InputText";
import { ButtonIcon } from "../components/common/Button";

// Importing context
import AppContext from "../appContext";

const Budget = () => {
    // Using AppContext
    const {categories, setCategories} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // State for budget
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [initialMoney, setInitialMoney] = useState<number>(0);
    const [actualMoney, setActualyMoney] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    
    // Handlers
    const handleCreateBudget = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || null;
        if (token) {
            const configRequest = {"Content-type": "application/json", "x-access-token": token};
            const budget = {
                user: "mario.rossi@gmail.com",
                name,
                description,
                initialMoney,
                actualMoney,
                category 
            }
            axios.post("/api/category", budget, {headers: configRequest})
                .then(res => {
                    const budgetData = res.data;
                    delete budgetData.__v; delete budgetData._id;
                    budgetData.date = new Date(budgetData.date);
                    setCategories ? setCategories([...categories, budgetData]) : console.log();
                    setAddModalOpen(!addModalOpen);
                })
                .catch(err => console.log(err.message))
        }
    }


    return (
        <UserPage>
            {/* Add category modal */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add budget" description="Insert values for all fields to create a budget" buttonLabel="Add" onSubmitClick={handleCreateBudget}>
                <div className="flex flex-col justify-start gap-4">
                    {/* <Select label="Type" data={K.transactionTypes} value={type} onChange={setType}/> */}
                    <InputText label="Budget name" value={name} setValue={setName} />
                    {/* <Select label="Tags" data={tags.map(({name}) => name)} value={selectedWallet} onChange={setSelectedWallet}/> */}
                </div> 
            </Modal>

            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Budget"/>
                    <Description description="Create your expense budget" />
                </div> 
                <ButtonIcon text="Add budget" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>
        </UserPage>
    );
}

export default Budget;