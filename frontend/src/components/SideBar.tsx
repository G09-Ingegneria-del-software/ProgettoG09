// Importing libraries
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importing components
import Line from './common/Line';
import Select from './common/Select'
import Spacer from './common/Spacer';

// Importing static stuff
import {K} from "../K"

// Importing images
const logoSrc = require("../assets/logo.svg").default as string;

const SideBar = () => {

    const firstName: string = "Mario";
    const lastName: string = "Rossi";

    type LinkType = {
        label: string,
        href: string
    }
    const links: LinkType[] = [
        {label: "Dashboard", href: "/"},
        {label: "Wallets", href: "/wallets"},
        {label: "Transactions", href: "/transactions"},
        {label: "Settings", href: "/settings"},
    ]

    const [selectedLink, setSelectedLink] = useState<LinkType>(links[0]);
    const [selectedWallet, setSelectedWallet] = useState<string>(K.wallets[0]);

    useEffect(() => {
        const href: string = window.location.href;
        for (let l of links) {
            if (href.includes(l.href)) setSelectedLink(l);
        } 
    }, [window.location.href]);

    // const handleWalletChange = (value: string) => {
    // };

    return (  
        <aside className="static flex-1 w-full max-w-[20rem] flex flex-col bg-clip-border rounded-xl bg-[#E4EDFF] p-4 shadow-md shadow-blue-gray-900/5">
            <section className="my-4 flex gap-2 justify-start items-center">
                <img src={logoSrc} alt="logo-img" />
                <h2 className="leading-7 text-secondary">money <br /> expense</h2>
            </section>

            <Line />

            <section className="my-4 flex flex-col gap-2">
                <p>Welcome back, <br /> <b>{firstName} {lastName}</b></p>
                <Select data={K.wallets} value={selectedWallet} onChange={setSelectedWallet}/>
            </section>

            <Line />

            <section className="my-4 flex flex-col gap-2">
                <nav className="flex flex-col min-w-[240px] text-base font-normal">
                    <ul className="flex flex-col gap-2">
                        {links.map(({label, href}: LinkType, i) => {
                            const baseStyles: string = "px-3 py-4 rounded-lg";
                            if (label !== "Settings") return <Link key={i} className={label === selectedLink.label ? `${baseStyles} bg-active text-white` : baseStyles} to={href}><li >{label}</li></Link>
                        })}
                    </ul>
                </nav>
            </section>

            <Spacer height='100%'/>

            <section className="my-4 flex flex-col items-start gap-8">
                <Link to="/settings"><p>Settings</p></Link>
                <button className="">Sign out</button>
            </section>
      </aside>
      
    );
}
 
export default SideBar;