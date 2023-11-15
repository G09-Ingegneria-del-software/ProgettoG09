import React, { ReactNode } from 'react'

// Importing components
import Subtitle from './common/Subtitle';

type Props = {
    description: string,
    label: string,
    // color1: string,
    // color2: string
}

const Card:React.FC<Props> = ({description, label}) => {
    return (
        <div className="relative flex flex-col justify-between shadow-lg text-white bg-gradient-to-b from-[#1053FF] to-[#1DA0CA] w-[450px] h-[250px] max-w-[600px] max-h-[400px] rounded-[2rem] p-8"
        >
            <div className="absolute top-[-20px] right-[-20px] w-[140px] h-[140px] rounded-full bg-white opacity-10"></div>
            <Subtitle subtitle={description} textColor='white'/>
            <p className='text-[56px] font-thin'>{label}</p>
        </div>
    );
}

export default Card;