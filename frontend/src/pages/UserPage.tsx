// Importing libraries
import React from "react";

// Importing components
import SideBar from '../components/SideBar';

// Importing context
import AppContext from "../appContext";

const UserPage = (props: any) => {
    
    return (
        <React.Fragment>
            {<div className="absolute flex w-full h-full">
                <SideBar />
                <section className="py-4 px-24 w-full">
                    {props.children}
                </section>
            </div>}
        </React.Fragment> 
    );
}

export default UserPage;