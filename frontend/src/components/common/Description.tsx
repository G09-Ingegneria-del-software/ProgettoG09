import React from 'react'

type Props = {
    description: string
}

const Description:React.FC<Props> = ({description}: Props) => {
    return (  
        <small className="text-secondary">
            {description}
        </small>
    );
}
 
export default Description;