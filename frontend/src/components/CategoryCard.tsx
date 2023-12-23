// Importing libraries
import { useState, useContext } from 'react'
import axios from 'axios';

// Importing components
import Subtitle from './common/Subtitle';
import Modal from '../components/common/Modal';
import InputText from '../components/common/InputText';

// Importing types
import { Category } from '../type';

// Importing context
import AuthContext from '../authContext';
import AppContext from '../appContext';

// Importing utils
import { getRequestHeaders } from '../utils';

type CategoryCardProps = {
    id: string,
    name: string,
};

const CategoryCard:React.FC<CategoryCardProps> = ({id, name}: CategoryCardProps) => {

    // Contexts
    const { user } = useContext(AuthContext);
    const { categories, setCategories } = useContext(AppContext);
    
    // Edit wallet state
    const [newName, setNewName] = useState<string>(name);
    
    // Modal states
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    // Edit wallet
    const handleEditCategory = () => {

        const {token, headers} = getRequestHeaders();

        const wallet = {
            user: user?.email || "",
            name: newName,
        };

        if (token) {
            axios.put(`/api/category/${name}`, wallet, {headers})
                .then(res => {
                    // Find wallet to update
                    const category = categories?.find((c: Category) => c.id === id);
                    if (category) {
                        const index: number = categories?.indexOf(category);
                        categories[index].name = newName;
                        setCategories ? setCategories(categories) : console.log("setCategories is undefined");
                    }
                    setEditModalOpen(false);
                })
                .catch(err => console.log(err.message));
        }
    }

    const handleDeleteCategory = () => {
        const {token, headers} = getRequestHeaders();

        if (token) {
            axios.delete(`/api/category/${user?.email}/${newName}`, {headers})
                .then(res => {
                    const category = categories?.find((c: Category) => c.id === id);
                    if (category) {
                        categories.splice(categories.indexOf(category), 1);
                        setCategories ? setCategories(categories) : console.log("setCategories is undefined");
                    }
                    setDeleteModalOpen(false);
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }


    const isSelected = true;
    const cardClasses = `relative flex flex-col overflow-hidden justify-between shadow-lg text-white bg-gradient-to-b ${isSelected ? 'bg-gradient-to-b from-[#1053FF] to-[#1DA0CA]' : 'bg-gradient-to-b from-[#ff9900] to-[#ffe486]'} w-[450px] h-[250px] max-w-[600px] max-h-[400px] rounded-[2rem] p-8`

    return (
        <>
            {/* Edit modal */}
            <Modal open={editModalOpen} setOpen={setEditModalOpen} title="Edit transaction" description="In this section you'll be able to edit your transaction modifying type, description, money and date" buttonLabel="Save" onSubmitClick={handleEditCategory}>
                <div className="flex flex-col justify-start gap-4">
                    <InputText label="Name" value={newName} setValue={setNewName} />
                </div> 
            </Modal>

            {/* Delete modal open */}
            <Modal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="Delete transaction" description="Are you sure you want to delete this transaction?" buttonLabel="Delete" onSubmitClick={handleDeleteCategory} />

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
            </div>
        </>
    );
}

export default CategoryCard;