
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
import Spacer from "../components/common/Spacer";
import BudgetCard from "../components/BudgetCard";

// Importing context
import AppContext from "../appContext";

const Budgets = () => {
    // Using AppContext
    const {categories, budgets, setBudgets} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // State for budget
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [initialMoney, setInitialMoney] = useState<number>(0);
    const [actualMoney, setActualyMoney] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.name);
    
    // Handlers
    const handleCreateBudget = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || null;
        if (token) {
            const configRequest = {"Content-type": "application/json", "x-access-token": token};
            const budget = {
                user: "mario.rossi@gmail.com",
                color: "red",
                name,
                description,
                initialMoney,
                actualMoney,
                category: selectedCategory, 
            }
            axios.post("/api/budget", budget, {headers: configRequest})
                .then(res => {
                    const budgetData = res.data;
                    delete budgetData.__v; delete budgetData._id;
                    budgetData.date = new Date(budgetData.date);
                    setBudgets ? setBudgets([...budgets, budgetData]) : console.log();
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
                    <InputText label="Description" value={description} setValue={setDescription} />
                    <InputText label="Initial amount" value={initialMoney.toString()} setValue={setInitialMoney} />
                    <InputText label="Actual amount" value={actualMoney.toString()} setValue={setActualyMoney} />
                    <Select label="Category" data={categories.map(({name}) => name)} value={selectedCategory} onChange={setSelectedCategory}/>
                </div> 
            </Modal>

            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Budgets"/>
                    <Description description="Create your expense budget" />
                </div> 
                <ButtonIcon text="Add budget" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>

            <Spacer height="2rem"/>

            <section className= "w-full grid grid-cols-2 place-items-center gap-4">
                {budgets.map(({name, description, initialMoney, actualMoney, category}, index) => <BudgetCard key={index} name={name} description={description} initialMoney={initialMoney} actualMoney={actualMoney} category={category}/>)}
            </section>
        </UserPage>
    );
}

export default Budgets;