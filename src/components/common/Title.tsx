// Importing libraries
import React from "react";

type Props = {
    title: string
}

const Title:React.FC<Props> = ({title}: Props) => {
    return ( 
        <h1 className="text-main">{title}</h1>
    );
}
 
export default Title;