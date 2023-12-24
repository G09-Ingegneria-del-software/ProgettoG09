// Importing libraries
import React from "react";

type Props = {
    title: string
    textColor?: string | "main"
}

const Title:React.FC<Props> = ({title, textColor}: Props) => {
    return ( 
        <h1 className={`text-${textColor}`}>{title}</h1>
    );
}
 
export default Title;