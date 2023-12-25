
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
import AuthContext from "../authContext";

// Importing utils
import { addUnderscore, getRequestHeaders } from "../utils";

const Categories = () => {

    // Using AppContext
    const {user} = useContext(AuthContext);
    const {categories, setCategories} = useContext(AppContext);

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

    // State for category
    const [name, setName] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [color, setColor] = useState<string>("");

    // Handlers
    const handleCreateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const {token, headers} = getRequestHeaders();
        if (token) {
            const tagsData = tags.split(",");
            const category = {
                user: user?.email || "", 
                name: addUnderscore(name),
                tags: tagsData,
                color
            }
            console.log(category.user + " " + category.name);
            axios.post(process.env.REACT_APP_API_URI + "/api/category", category, {headers})
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
                    <InputText label={`Tags (separate every tag with ",")`} value={tags} setValue={setTags} />
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
                {categories.map(({id, name, tags}, index) => <CategoryCard key={index} id={id} name={name} />)}
            </section>
        </UserPage>
    );
}

export default Categories;