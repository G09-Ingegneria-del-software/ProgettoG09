import react from 'react'

import Subtitle from './common/Subtitle';

type Props = {
    name: string,
    balance: string,
    color: string,
    // color1: string,
    // color2: string
}

const WalletCard:React.FC<Props> = ({name, balance, color}) => {
    const isEvenKey = color !== undefined && parseInt(color,10) % 2 == 0;
    console.log(isEvenKey);
    const cardClasses = `relative flex flex-col justify-between shadow-lg text-white bg-gradient-to-b ${isEvenKey ? 'bg-gradient-to-b from-[#1053FF] to-[#1DA0CA]' : 'bg-gradient-to-b from-[#ff9900] to-[#ffe486]'} w-[450px] h-[250px] max-w-[600px] max-h-[400px] rounded-[2rem] p-8`
    return (
        <div className={cardClasses}
        >
            <div className="absolute top-[-20px] right-[-20px] w-[140px] h-[140px] rounded-full bg-white opacity-10"></div>
            <Subtitle subtitle={name} textColor='white'/>
            <p className='text-[56px] font-thin'>€ {balance}</p>
        </div>
    );
}

export default WalletCard;