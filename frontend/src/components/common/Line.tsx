import React from 'react'

type Props = {
    color?: string | "#D2DCED"
}

const Line:React.FC<Props> = ({color}: Props) => {
    return (  
        <div className="w-[100%] h-[1px] " style={{backgroundColor: color}}></div>
    );
}
 
export default Line;