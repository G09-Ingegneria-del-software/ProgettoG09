import React from 'react'

type Props = {
    subtitle: string
}

const Subtitle: React.FC<Props> = ({subtitle}: Props) => {
    return (
        <h2 className="text-main">{subtitle}</h2>
    )
}

export default Subtitle;