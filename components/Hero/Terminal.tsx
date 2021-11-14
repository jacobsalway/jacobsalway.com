import React from 'react'
import { TerminalProps } from '../../types'
import FadeIn, { AnimateProps } from '../FadeIn'

const Terminal: React.FC<TerminalProps & AnimateProps> = ({ output, animate, onComplete }) => {
    const headerButtonColours = ['red', 'yellow', 'green']

    return (
        <div className='w-full hidden xl:block'>
            <FadeIn animate={animate} onComplete={onComplete}>
                <div className='h-48 rounded-lg overflow-hidden shadow'>
                    <div className='h-7 flex justify-start items-center bg-gray-200 px-2'>
                        {headerButtonColours.map(c => <div className={`w-2.5 h-2.5 rounded-full mr-1.5 bg-${c}-500`} />)}
                    </div>
                    <div className='p-2.5 font-mono text-xs h-full bg-gray-800 text-white'>
                        {output.map((cmd, i) => <div key={i} className='whitespace-pre-wrap'>{cmd}</div>)}
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}

export default Terminal