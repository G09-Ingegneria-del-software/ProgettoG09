import React, { ReactNode } from 'react'

// Importing components
import Subtitle from './common/Subtitle';
import Description from './common/Description';
import Card from './Card';
import Spacer from './common/Spacer';

type Props = {
    subtitle: string,
    description: string,
    children?: ReactNode
}

const DashboardSection:React.FC<Props> = ({subtitle, description, children}: Props) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <Subtitle subtitle={subtitle} />
            <Description description={description}/>
            <Spacer height='2rem'/>
            {children}
        </div>
    );
}

export default DashboardSection;