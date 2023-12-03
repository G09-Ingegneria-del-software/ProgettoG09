// Importing libraries
import { useState, useEffect } from 'react';

// Importing pages
import UserPage from './UserPage';

// Importing components
import Modal from '../components/common/Modal';
import Title from '../components/common/Title';
import Description from '../components/common/Description';
import Subtitle from '../components/common/Subtitle';
import InputText from '../components/common/InputText';
import { ButtonIcon } from "../components/common/Button"
import Spacer from '../components/common/Spacer';

const Settings = () => {

    const [firstName, setFirstName] = useState<string>("");
    const [secondName, setSecondName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [repeatedNewPassword, setRepeatedNewPassword] = useState<string>("");
    
    const [hasDoubleFactorAuth, setDoubleFactorAuth] = useState(false);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("POMODORO");
    }

    const changePassword = (e: any) => {
        e.preventDefault();
        setModalOpen(!modalOpen);
    }

    const submitPassword = (e: any) => {
        e.preventDefault();
        if (newPassword === repeatedNewPassword) {
            setModalOpen(false);
        }
    }

    useEffect(() => {
        if (newPassword != repeatedNewPassword) {
            console.log("PATATA!!!")
        }
    }, [newPassword, repeatedNewPassword]);

    return (  
        <UserPage>
            <Modal open={modalOpen} setOpen={setModalOpen} title="Change password" description="Are you really sure you want to change your password?" buttonLabel='Save' onSubmitClick={submitPassword}>
                <div className="flex flex-col gap-4 justify-start">
                    <InputText label="New password" value={newPassword} setValue={setNewPassword} type="password"/>
                    <InputText label="Repeat new password" value={repeatedNewPassword} setValue={setRepeatedNewPassword} type="password"/>
                    <Spacer height="1rem"/>
                </div>
            </Modal>
            <Title title="Settings"/>
            <Description description="Here you can modify your personal information"/>

            <Spacer height="1rem"/>

            <section className="w-full bg-white rounded-xl shadow-lg p-8">
                <Subtitle subtitle="Personal information"/>

                <form action="" className="w-full flex flex-col gap-4">
                    <div className='w-full flex justify-start items-center gap-8'>
                        <InputText label="First name" value={firstName} setValue={setFirstName} />
                        <InputText label="Second name" value={secondName} setValue={setSecondName} />
                    </div>
                    <div className='w-full flex justify-start items-center gap-8'>
                        <InputText label="Email" value={email} setValue={setEmail} disabled={true} />
                        <div className="w-[300px] h-full flex justify-start items-center">
                            <div className="flex items-center mt-7">
                                <input onChange={() => setDoubleFactorAuth(!hasDoubleFactorAuth)} name="doubleFactorAuth" type="checkbox" className="h-4 w-4 rounded-xl border-gray-300 text-active focus:outline-none focus:ring-indigo" checked={hasDoubleFactorAuth}/>
                                <label htmlFor='doubleFactorAuth' className="ml-2 text-active">Enable 2 factor auth</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex justify-start items-center gap-8'>
                        <InputText label="Password" value={password} setValue={setPassword} type="password" disabled={true} />
                        <div className="w-[300px] h-full flex justify-start items-center">
                            <button onClick={changePassword} className="text-active mt-7">Change password</button> 
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <Spacer width="80%"/>
                        <ButtonIcon text="Save" color="active" handleClick={e => handleSubmit(e)} iconSrc={require("../assets/icons/check.svg").default}/>
                    </div>
                </form>
            </section>
        </UserPage>
    );
}
 
export default Settings;