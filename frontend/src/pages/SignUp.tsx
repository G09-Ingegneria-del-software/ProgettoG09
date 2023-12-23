// Importing libraries
import React,{useState,ChangeEvent, useContext} from 'react';
import BackgroundImage from '../assets/images/signup_wallpaper.jpg';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Importing static stuff
import { checkPassword } from '../K';

// Importing context
import AuthContext from '../authContext';

const SignUp = () => {

    const {isAuthenticated, setAuthenticated} = useContext(AuthContext);

    const [name, setName] = useState ('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatchError, setPasswordsMatchError] = useState(false);
    const [GDPR, setGDPR] = useState(false);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleGDPR = () => {
        setGDPR(!GDPR);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (password === confirmPassword && checkPassword(password) && checkPassword(confirmPassword)){
            const firstName = name.split(' ')[0];
            const lastName = name.split(' ')[1];
            axios.post("/auth/signup", {firstName, lastName, email, password})
                .then((res: any) => {
                    navigate('/login');
                })
                .catch((err: Error) => console.log(err.message));
                setPasswordsMatchError(false);

        } else{
            //Le password non corrispondono
            setPasswordsMatchError(true);
        }

      };

    const navigate = useNavigate ();
    const handleLoginClick = () => {
        navigate ('/login');
    };

    return (
        <div className="flex overflow-hidden">
            <div className="w-1/2 h-screen">
            <div className=" grid grid-cols-6 h-screen">
                    <div className="col-span-1  h-screen"></div>
                    <div className= "col-span-3 py-28">
                        <h2 className="font-bold tracking-normal text-4xl"> Sign up</h2>
                        <p className="text-secondary text-sm py-5">Welcome in Money Expense! Your journey starts here.</p>

                        {/*Inputs */}
                        <div className="py-10">
                            <div>
                                <label htmlFor="name" className=" text-secondary">First name and second name</label>
                                <input type="text" id="name" className= "w-full p-2 border rounded-lg py-3 text-lg border-gray-400 text-black" placeholder="Mario Rossi" value={name} onChange={handleNameChange}
                                />
                            </div>
                            <div className="pt-10">
                                <label htmlFor="email" className="text-secondary">Email</label>
                                <input type="text" id="email" className="w-full p-2 border rounded-lg py-3 text-xl border-gray-400" placeholder="YourEmail@gmail.com" value={email} onChange={handleEmailChange}
                                />

                            </div>
                            <div className="pt-10">
                                <label htmlFor="password" className="text-secondary">Password</label>
                                <input type="password" id="password" className="w-full p-2 border rounded-lg py-3 text-xl border-gray-400" placeholder="Password" value={password} onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="pt-10">
                            <label htmlFor="confirmPassword" className={`text-secondary ${passwordsMatchError ? 'text-red-500' : ''}`}>
                                Confirm Password

                                {/*Handle not matching passwords */}
                                {passwordsMatchError && <span className="ml-2 text-sm">(Passwords do not match)</span>}
                            </label>
                                <input type="password" id="confirmPassword" className="w-full p-2 border rounded-lg py-3 text-xl border-gray-400" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <div className="py-10 flex items-center">
                            <label className="flex items-center">
                                <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-secondary"
                                checked={GDPR}
                                onChange={handleGDPR}
                                />
                                <span className="ml-2 font-bold">Accept GDPR Rights</span>
                            </label>
                            <a href='#' className="ml-auto text-secondary hover:text-[#66ccff]">Forgot Password?</a>
                            </div>

                            <button className="w-full bg-[#66ccff] text-white py-2 rounded-md hover:bg-[#3399ff]" onClick={handleSubmit}>Sign up</button>

                            <p className="py-16 text-sm text-secondary"> Already registered? <a href='#' className="text-[#66ccff] hover: text-[#3399ff]" onClick = {handleLoginClick}>Login</a></p>
                        </div>
                    </div>
                    <div className="col-span-1"></div>

            </div>

            
            </div>
            <div className="w-1/2 h-screen relative" style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className ="absolute flex justify-start items-center top-0 right-10">
                    <img className="p-5" src={require("../assets/logo.svg").default} alt="logo" />
                    <h2 className="leading-6 text-white pb-1">money <br/> expense</h2>
                </div>
                
                <div className="pl-4 text-white text-opacity-30 tracking-widest py-28">
                    <p className ="text-bigger leading-none">YOUR</p>
                    <p className ="text-bigger leading-none">NEW</p>
                    <p className ="text-bigger leading-none">JOURNEY</p>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;