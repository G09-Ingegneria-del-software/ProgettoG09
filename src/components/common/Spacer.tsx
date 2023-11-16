import React from "react";

type Props = {
    width?: string | "100%",
    height?: string | "100%"
}

const Spacer: React.FC<Props> = ({width, height}: Props) => {
    return (  
        <div style={{position: 'relative', width, height}}>
        </div>
    );
}
 
export default Spacer;