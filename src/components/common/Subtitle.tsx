import React from 'react'

type Props = {
    subtitle: string,
    textColor?: string | "main"
}

const Subtitle: React.FC<Props> = ({subtitle, textColor}: Props) => {
    return (
        <h2 className={`text-${textColor}`}>{subtitle}</h2>
    )
}

export default Subtitle;