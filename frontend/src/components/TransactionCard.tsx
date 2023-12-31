// Importing libraries
import { FC, useContext, useState } from "react"
import axios from "axios";

// Importing components
import InputText from "./common/InputText";
import Select from "./common/Select";
import Modal from "./common/Modal";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

// Importing types
import { Budget, Transaction, TransactionType, Wallet, calculateColor } from "../type";

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
    const { allTransactions, setAllTransactions, transactions, setTransactions, wallets, selectedWallet, setWallets, categories, budgets, setBudgets } = useContext(AppContext);

    // Modal for editing transaction
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const [newDescription, setNewDescription] = useState<string>(description);
    const [newMoney, setNewMoney] = useState<number>(money);
    const [newDate, setNewDate] = useState<DateValueType>({
        startDate: date as Date,
        endDate: date as Date
    });

    // Event handlers
    const handleDateChange = (newValue: DateValueType) => {
        setNewDate(newValue);
    }

    // Edit transaction 
    const handleEditTransaction = () => {
        const {token, headers} = getRequestHeaders();
        const transactionData = {
            _id: id,
            user: user?.email || "",
            money: Number(newMoney),
            description: newDescription,
            date: newDate?.startDate || new Date(Date.now())
        }

        if (token) {
            axios.put(`${process.env.REACT_APP_API_URI}/api/transaction`, transactionData, {headers})
                .then(res => {
                    // Find transaction to edit and update
                    const transaction = allTransactions?.find((t: Transaction) => t.id === id);
                    if (transaction) {
                        transaction.money = transactionData.money; // add this line to update 

                        // Update transaction
                        const transactionIndex: number = allTransactions.indexOf(transaction);
                        allTransactions[transactionIndex].money = transaction.money;
                        allTransactions[transactionIndex].description = transaction.description;
                        setAllTransactions ? setAllTransactions([...allTransactions]) : console.log("setAllTransactions is undefined");

                        // Update wallet
                        let updatedMoney = (selectedWallet?.money || 0);
                        if (type === TransactionType.EXPENSE) updatedMoney = updatedMoney + money - transaction.money;
                        else if (type === TransactionType.INCOME) updatedMoney = updatedMoney - money + transaction.money;
                        if (selectedWallet) {
                            const walletIndex: number = wallets.indexOf(selectedWallet);
                            wallets[walletIndex].money = Math.round(updatedMoney*100)/100;
                            setWallets ? setWallets([...wallets]) : console.log("setWallets is undefined");
                        }

                        // Update budgets
                        const filteredBudgets = budgets.filter((b: Budget) => b.category === transaction.category);
                        if (filteredBudgets.length > 0) {
                            for (let budgetIndex = 0; budgetIndex < budgets.length; budgetIndex++) {
                                let updatedMoney = (budgets[budgetIndex].actualMoney);
                                if (type === TransactionType.EXPENSE) updatedMoney = updatedMoney + money - transaction.money;
                                else updatedMoney = updatedMoney - money + transaction.money;
                                budgets[budgetIndex].actualMoney = updatedMoney;
                            }
                        }
                        setBudgets ? setBudgets([...budgets]) : console.log("setBudgets is undefined");
                    }
                    setEditModalOpen(false);
                })
                .catch(err => console.log(err.message));
        }
    }

    const handleDeleteTransaction = () => {
        const {token, headers} = getRequestHeaders();

        if (token) {
            axios.delete(`${process.env.REACT_APP_API_URI}/api/transaction/${id}`, {headers})
                .then(res => {
                    // Find transaction
                    const transaction = allTransactions?.find((t: Transaction) => t.id === id);

                    if (transaction) {
                        // Update transaction
                        const transactionIndex: number = allTransactions?.indexOf(transaction);
                        allTransactions.splice(transactionIndex, 1);
                        setAllTransactions ? setAllTransactions([...allTransactions]) : console.log("setAllTransactions is undefined");

                        // Update wallet
                        let updatedMoney: number = (selectedWallet?.money || 0);
                        if (type === TransactionType.EXPENSE) updatedMoney = (updatedMoney + money);
                        else if (type === TransactionType.INCOME) updatedMoney = (updatedMoney - money);
                        if (selectedWallet) {
                            const walletIndex: number = wallets.indexOf(selectedWallet);
                            wallets[walletIndex].money = Math.round(updatedMoney*100)/100;
                            setWallets ? setWallets([...wallets]) : console.log("setWallets is undefined");
                        }

                        // Update budgets
                        const filteredBudgets = budgets.filter((b: Budget) => b.category === transaction.category);
                        if (filteredBudgets.length > 0) {
                            for (let budgetIndex = 0; budgetIndex < budgets.length; budgetIndex++) {
                                let updatedMoney = (budgets[budgetIndex].actualMoney);
                                if (type === TransactionType.EXPENSE) updatedMoney = updatedMoney + money;
                                else updatedMoney = updatedMoney - money;
                                budgets[budgetIndex].actualMoney = updatedMoney;
                            }
                        }
                        setBudgets ? setBudgets([...budgets]) : console.log("setBudgets is undefined");
                    }


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
                    <InputText label="Description" value={newDescription} setValue={setNewDescription} />
                    <InputText label="Money" value={newMoney.toString()} setValue={setNewMoney} />
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
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4"><p className="w-[300px] leading-8 whitespace-normal line-clamp-1">{category}</p></td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-secondary">{new Date(newDate?.startDate || Date.now()).getDate()}/{new Date(newDate?.startDate || Date.now()).getMonth() + 1}/{new Date(newDate?.startDate || Date.now()).getFullYear()}</td>
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