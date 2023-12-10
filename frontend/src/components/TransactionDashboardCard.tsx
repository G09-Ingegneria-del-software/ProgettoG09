import React, {useState, useEffect} from 'react'

// Importing components
import Line from './common/Line';

// Importing types
import { Transaction, calculateColor } from '../type';


const TransactionDashboardCard = () => {
     
    const [lastTransactions, setLastTransactions] = useState<Transaction[]>([]); 
    
    useEffect(() => {
        setLastTransactions([]);
    }, []);

    return (  
        <div className="w-full bg-white rounded-lg shadow-lg p-4">
            <ul className="">
                {lastTransactions.map((t: Transaction) => {
                    
                    return <li className='flex justify-center items-start gap-2'>
                        <div className={`relative w-[2rem] h-[2rem] rounded-full bg-${calculateColor(t.type)}-200`}>
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1.2rem] h-[1.2rem] rounded-full bg-${calculateColor(t.type)}-700`}>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <p className=''>{t.description}</p>
                            <small className="text-secondary">{t.date.toDateString()}</small>
                        </div>
                        <div className="">
                            <p className={`bold text-${calculateColor(t.type)}`}>
                                {t.money}€
                            </p>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    );
}
 
export default TransactionDashboardCard;