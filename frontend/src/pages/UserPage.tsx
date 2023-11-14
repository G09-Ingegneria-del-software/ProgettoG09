// Importing libraries
import React from "react";

// Importing components
import SideBar from '../components/SideBar';

const UserPage = (props: any) => {
    return (
        <React.Fragment>
            <div className="flex">
                <SideBar />
                <section className="p-4">
                    {props.children}
                </section>
            </div>
        </React.Fragment> 
    );
}

export default UserPage;