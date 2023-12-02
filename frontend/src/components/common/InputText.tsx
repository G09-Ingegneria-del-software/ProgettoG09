// Importing libraries
import React from "react";

type InputProps = {
    label: string,
    value: string,
    type?: string | "text"
    setValue: (value: string) => void,    
    disabled?: boolean | false
};

const InputText: React.FC<InputProps> = ({label, value, type, setValue, disabled}) => {
    const inputBaseStyles="w-full p-4 rounded-md focus:outline-none ring-2 ring-main focus:ring-secondary";
    return (
        <div className="w-full flex flex-col justify-start gap-4">
            <label htmlFor={label} className="text-secondary">{label}</label>
            <input disabled={disabled} type={type} value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={`Insert your ${label.toLowerCase()}`} className={disabled ? inputBaseStyles + " bg-slate-100 opacity-0.5" : inputBaseStyles} />
        </div>
    );
}

export default InputText;