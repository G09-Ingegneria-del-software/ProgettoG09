// Importing libraries
import { useState } from 'react';
import { Popover } from '@headlessui/react'

// Importing components
import Select from './Select';
import InputText from './InputText';
import Datepicker from 'react-tailwindcss-datepicker';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// Impoting static stuff
import { K } from '../../K';

type PopoverTextProps = {
    typeValue: string,
    setTypeValue: (s: string) => void,
    startDate: Date,
    setStartDate: (s: Date) => void,
    endDate: Date,
    setEndDate: (s: Date) => void,
    amountValue: string,
    setAmountValue: (s: string) => void,
};

const PopoverText: React.FC<PopoverTextProps> = ({ typeValue, setTypeValue, startDate, setStartDate, endDate, setEndDate, amountValue, setAmountValue }: PopoverTextProps) => {

    const handleDateChange = (v: any) => {
        setStartDate(v.startDate);
        setEndDate(v.endDate);
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button className="flex justify-center items-center gap-1">
                        Filter by...
                        <ChevronDownIcon className={open ? 'w-[2rem] h-[2rem] transition duration-300 rotate-180 transform' : 'w-[2rem] h-[2rem] transition duration-300 '} />
                    </Popover.Button>
                    <Popover.Panel className="border-2 border-secondary flex justify-center items-center shadow-lg max-w-[350px] w-[350px] bg-white rounded-lg px-4 py-8 t-[4rem] -translate-x-[300px] absolute z-10">
                        <div className=" flex flex-col justify-start items-center gap-2">
                            <Select label="Type" data={K.transactionTypes} value={typeValue} onChange={setTypeValue} />
                            <div className='w-full flex flex-col gap-1'>
                                <label className="text-secondary">Start and end dates</label>
                                <Datepicker value={{startDate, endDate}} onChange={handleDateChange} />
                            </div>
                            <InputText label="Amount" value={amountValue.toString()} setValue={setAmountValue} />
                        </div>
                    </Popover.Panel>
                </>
            )}

        </Popover>
    )
}

export default PopoverText;