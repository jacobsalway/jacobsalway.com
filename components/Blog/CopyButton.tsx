import { faClone } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef, useState } from 'react'
import copy from 'copy-to-clipboard'

export interface CopyButtonProps {
    className?: string
    valueToCopy: string
}

const CopyButton: React.FC<CopyButtonProps> = ({ className, valueToCopy }) => {
    const [pressed, setPressed] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleClick = () => {
        copy(valueToCopy)
        setPressed(true)

        // if clicked while timeout is active, clear timeout and restart timer
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setPressed(false)
        }, 2000)
    }

    return (
        <div className={className}
             onClick={handleClick}>
            <span className='mr-1.5'>{pressed ? 'Copied' : 'Copy'}</span>
            <FontAwesomeIcon icon={pressed ? faCheck : faClone} />
        </div>
    )
}

export default CopyButton