
// Importing libraries
import { useState, useEffect, useContext } from "react";
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
import CategoryCard from "../components/CategoryCard";
import Spacer from "../components/common/Spacer";

// Importing context
import AppContext from "../appContext";
import MultiSelect from "../components/common/MultiSelect";

const Categories = () => {

    // Using AppContext
    const {categories, setCategories} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // State for category
    const [name, setName] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [color, setColor] = useState<string>("");

    // Handlers
    const handleCreateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token") || null;
        if (token) {
            const configRequest = {"Content-type": "application/json", "x-access-token": token};
            const tagsData = tags.split(",");
            const category = {
                user: "mario.rossi@gmail.com",
                name,
                tags: tagsData,
                color
            }
            axios.post("/api/category", category, {headers: configRequest})
                .then(res => {
                    const categoryData = res.data;
                    delete categoryData.__v; delete categoryData._id;
                    categoryData.date = new Date(categoryData.date);
                    setCategories ? setCategories([...categories, categoryData]) : console.log();
                    setAddModalOpen(!addModalOpen);
                })
                .catch(err => console.log(err.message))
        }
    }

    return (
        <UserPage>
            {/* Add category modal */}
            <Modal open={addModalOpen} setOpen={setAddModalOpen} title="Add category" description="Insert values for all fields to create a budget" buttonLabel="Add" onSubmitClick={handleCreateCategory}>
                <div className="flex flex-col justify-start gap-4">
                    {/* <Select label="Type" data={K.transactionTypes} value={type} onChange={setType}/> */}
                    <InputText label="Category name" value={name} setValue={setName} />
                    {/* <Select label="Tags" data={tags.map(({name}) => name)} value={selectedWallet} onChange={setSelectedWallet}/> */}
                    <InputText label="Tags (separate every tag with ',')" value={tags} setValue={setTags} />
                </div> 
            </Modal>

            <div className="flex w-full justify-between items-center">
                <div className="flex flex-col">
                    <Title title="Categories"/>
                    <Description description="List of all you expense/income categories"/>
                </div> 
                <ButtonIcon text="Add category" iconSrc={require("../assets/icons/plus.svg").default} color="active" handleClick={() => setAddModalOpen(!addModalOpen)}/>
            </div>

            <Spacer height="2rem"/>

            <section className= "w-full grid grid-cols-2 place-items-center gap-4">
                {categories.map(({name, tags}, index) => <CategoryCard key={index} name={name} />)}
            </section>
        </UserPage>
    );
}

export default Categories;