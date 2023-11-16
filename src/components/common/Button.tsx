import React from 'react'

interface ButtonTextProps {
    text: string,
    color: string
}

export const ButtonText: React.FC<ButtonTextProps> = ({text, color}: ButtonTextProps) => {
    return (  
        <button className={`px-6 py-3 rounded-lg shadow-xl text-white bg-${color} transition ease-in-out duration-150 hover:scale-105 hover:opacity-[0.9]`}>
            {text}
        </button>
    );
}

interface ButtonIconProps extends ButtonTextProps {
    iconSrc: string
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({text, color, iconSrc}: ButtonIconProps) => {
    return (
        <button className={`px-6 py-3 rounded-lg shadow-xl text-white bg-${color} transition ease-in-out duration-150 hover:scale-105 hover:opacity-[0.9]`}>
            <div className="flex justify-center gap-2 items-center">
                {text}
                <img src={iconSrc} alt="icon" />
            </div>
        </button> 
    );
}