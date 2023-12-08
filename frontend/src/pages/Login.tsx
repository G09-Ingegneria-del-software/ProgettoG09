import React,{useState, useContext} from 'react';
import BackgroundImage from "../assets/images/login_wallpaper.jpg";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// Importing context
import AppContext from '../appContext';

const Login = () => {

    const {setUser} = useContext(AppContext);

    const[email, setEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState(false)

    
    const navigate = useNavigate ();
    const handleSignUpClick = () => {
        navigate ('/sign-up');
    };

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);
    const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        axios.post("/auth/login", {email, password})
            .then((res: any) => {
                const {token, id} = res.data;
                localStorage.setItem("token", token);
                // TODO: retrieve the user with the given id/email
                window.location.href = "/dashboard";
                navigate('/dashboard');
            })
            .catch((err: Error) => console.log(err.message));
    }; 


    return (
        <div className="flex">
            <div className="w-1/2 h-screen" style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className ="absolute flex  justify-start items-center">
                    <img className="p-5" src={require("../assets/logo.svg").default} alt="logo" />
                    <h2 className="leading-6 text-white pb-1">money <br/> expense</h2>
                </div>
                
                <div className="pl-4 text-white text-opacity-30 tracking-widest py-28">
                <p className ="text-bigger leading-none">TRACK</p>
                <p className ="text-bigger leading-none">SAVE</p>
                <p className ="text-bigger leading-none">THRIVE</p>
                </div>
            </div>
            <div className="w-1/2">
                <div className=" grid grid-cols-6 h-screen">
                    <div className="col-span-1  h-screen"></div>
                    <div className= "col-span-3 py-28">
                        <h2 className="font-bold tracking-normal text-4xl"> Login</h2>
                        <p className="text-secondary text-sm py-5">Track your expenses!</p>

                        <form action="">
                            {/*Text inputs*/}
                            <div className="py-10">
                                <div>
                                    {/* Email input */}
                                    <label htmlFor="email" className=" text-secondary">Email</label>
                                    <input onChange={handleEmailChange} type="text" id="email" className= "w-full p-2 border rounded-lg py-3 text-lg border-gray-400 text-black" placeholder="YourEmail@gmail.com" value={email}
                                    />
                                </div>
                                <div className="pt-10">
                                    {/* Password input */}
                                    <label htmlFor="password" className="text-secondary">Password</label>
                                    <input onChange={handlePasswordChange} type="password" id="password" className="w-full p-2 border rounded-lg py-3 text-xl border-gray-400" placeholder="Password" value={password}
                                    />
                                </div>
                            </div>
                            {/*Check inputs*/}
                            <div className="py-5 flex items-center">
                                <label className="flex items-center">
                                    <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-secondary"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    />
                                    <span className="ml-2 font-bold">Remember Me</span>
                                </label>
                                <a href='#' className="ml-auto text-secondary hover:text-[#66ccff]">Forgot Password?</a>
                            </div>
                            {/*Login button*/}
                            <button type="submit" className="w-full bg-[#66ccff] text-white py-2 rounded-md hover:bg-[#3399ff]" onClick={handleSubmit}>Login</button>
                        </form>

                        <p className="py-16 text-sm text-secondary"> Not a User yet? <a href='#' className="text-[#66ccff] hover: text-[#3399ff]" onClick = {handleSignUpClick}>Signup</a></p>
                    </div>
                    <div className="col-span-1"></div>

                    {/*inputs*/ }
                </div>
            </div>
        </div>
    );
}
 
export default Login;