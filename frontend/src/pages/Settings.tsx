// Importing libraries
import { useState } from 'react';

// Importing pages
import UserPage from './UserPage';

// Importing components
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("PATATA");
    }

    return (  
        <UserPage>
            <Title title="Settings"/>
            <Description description="Here you can modify your personal information"/>

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
                            <label className="flex items-center mt-7">
                                <input type="checkbox" className="form-checkbox h-5 w-5 bg-active text-active" checked />
                                <span className="ml-2 text-active">Enable 2 factor auth</span>
                            </label>
                        </div>
                    </div>
                    <div className='w-full flex justify-start items-center gap-8'>
                        <InputText label="Password" value={password} setValue={setPassword} type="password" disabled={true} />
                        <div className="w-[300px] h-full flex justify-start items-center">
                            <button className="text-active mt-7">Change password</button> 
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