import { faClone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export interface CopyButtonProps {
    className?: string
    valueToCopy: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ className, valueToCopy }) => {
    const [pressed, setPressed] = useState(false)

    const handleClick = () => {
        setPressed(true)
        setTimeout(() => {
            setPressed(false)
        }, 3000)
    }

    return (
        <div className={className}
             onClick={handleClick}>
            {pressed ? 'Copied' : 'Copy'}
            <FontAwesomeIcon icon={faClone} />
        </div>
    )
}

export default CopyButton