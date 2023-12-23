// Importing libraries
import { FC, useContext, useState } from "react"
import axios from "axios";

// Importing components
import InputText from "./common/InputText";
import Select from "./common/Select";
import Modal from "./common/Modal";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

// Importing types
import { Transaction, calculateColor } from "../type";

// Importing context
import AuthContext from "../authContext";
import AppContext from "../appContext";

// Importing utils
import { getRequestHeaders, addUnderscore } from "../utils";

// Importing static stuff
import { K } from "../K";

type TransactionCardProps = {
    id: string,
    category: string,
    wallet: string,
    type: string,
    money: number,
    description: string,
    date: Date
};

const TransactionCard: FC<TransactionCardProps> = ({id, category, wallet, type, money, description, date}: TransactionCardProps) => {

    // Context
    const { user } = useContext(AuthContext);
    const { transactions, setTransactions, wallets } = useContext(AppContext);

    // Modal for editing transaction
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const [newType, setNewType] = useState("expense");
    const [newDescription, setNewDescription] = useState<string>("");
    const [newMoney, setNewMoney] = useState<number>(0);
    const [newWalletName, setNewWalletName] = useState<string>(wallet);
    const [newCategoryName, setNewCategoryName] = useState<string>(category);
    const [newDate, setNewDate] = useState<DateValueType>({
        startDate: new Date(),
        endDate: new Date(),
    });

    // Event handlers
    const handleDateChange = (newValue: DateValueType) => {
        setNewDate(newValue);
    }

    // Edit transaction 
    const handleEditTransaction = () => {
        const {token, headers} = getRequestHeaders();
        const transaction = {
            _id: id,
            user: user?.email || "",
            type: newType,
            money: Number(money),
            description: description,
            wallet: addUnderscore(newWalletName),
            category: addUnderscore(newCategoryName)
        }

        if (token) {
            axios.put(`/api/transaction`, transaction, {headers})
                .then(res => {
                    // Find transaction to edit and update
                    const transaction = transactions?.find((t: Transaction) => t.id === id);
                    if (transaction) {
                        const index: number = transactions?.indexOf(transaction);
                        transactions[index].type = newType;
                        transactions[index].description = newDescription;
                        transactions[index].money = newMoney;
                        setTransactions ? setTransactions([...transactions]) : console.log("setTransactions is undefined");
                    }
                    setEditModalOpen(false);
                })
                .catch(err => console.log(err.message));
        }
    }

    const handleDeleteTransaction = () => {
        const {token, headers} = getRequestHeaders();

        if (token) {
            axios.delete(`/api/transaction/${id}`, {headers})
                .then(res => {
                    // Find transaction to delete and update
                    transactions.splice(selectedIndex, 1);
            
                    setTransactions ? setTransactions([...transactions]) : console.log("setTransactions undefined");
                    // setCurTransactions(transactions);
                    // if (visibleTransactions.length === 1) {
                    //     setCurPage(--curPage);
                    // }
                    // setNumPages(Math.ceil(curTransactions.length / limit));
                    // setVisibleTransactions(curTransactions.slice((curPage - 1) * limit, (curPage) * limit));
                })
                .catch(err => console.log(err.message));
        }

        setDeleteModalOpen(!deleteModalOpen);
    }

    return (
        <>
            {/* Edit modal */}
            <Modal open={editModalOpen} setOpen={setEditModalOpen} title="Edit transaction" description="In this section you'll be able to edit your transaction modifying type, description, money and date" buttonLabel="Save" onSubmitClick={handleEditTransaction}>
                <div className="flex flex-col justify-start gap-4">
                    <Select label="Type" data={K.transactionTypes} value={newType} onChange={setNewType}/>
                    <InputText label="Description" value={newDescription} setValue={setNewDescription} />
                    <InputText label="Amount" value={newMoney.toString()} setValue={setNewMoney} />
                    {/* <Select label="Currency" data={K.currencies} value={newCurrency} onChange={setNewCurrency}/> */}
                    <div className="flex flex-col gap-1">
                        <label className="text-secondary">Date</label>
                        <div className="focus:outline-none border-1 border-secondary">
                            <Datepicker primaryColor="indigo" value={newDate} onChange={handleDateChange} />
                        </div>
                    </div>
                </div> 
            </Modal>

            {/* Delete modal open */}
            <Modal open={deleteModalOpen} setOpen={setDeleteModalOpen} title="Delete transaction" description="Are you sure you want to delete this transaction?" buttonLabel="Delete" onSubmitClick={handleDeleteTransaction} />

            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-main">
                <div className="relative w-[1.5rem] h-[1.5rem]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.5rem] h-[1.5rem] rounded-full" style={{ backgroundColor: calculateColor(type), opacity: 0.2 }}>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.8rem] h-[0.8rem] rounded-full" style={{ backgroundColor: calculateColor(type) }}>
                    </div>
                </div>
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4"><p className="w-[300px] leading-8 whitespace-normal line-clamp-1">{description}</p></td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-secondary">{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" style={{ color: calculateColor(type) }}>{money}</td>
            {/* Edit transaction */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <button onClick={() => setEditModalOpen(!editModalOpen)} className="p-2 rounded-md text-white flex justify-center items-center transition duration-300 hover:opacity-70 hover:bg-slate-100">
                    <img src={require("../assets/icons/edit.svg").default} alt="edit-icon" />
                </button>
            </td>
            {/* Delete transaction */}
            <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-8">
                <button onClick={() => setDeleteModalOpen(!deleteModalOpen)} className="p-2 rounded-md text-white flex justify-center items-center transition duration-300 hover:opacity-70 hover:bg-red-100">
                    <img src={require("../assets/icons/trash.svg").default} alt="trash-icon" />
                </button>
            </td>
        </>
    );
}

export default TransactionCard;