import React from 'react'
import { TerminalProps } from '../../types'
import FadeIn, { AnimateProps } from '../FadeIn'

const Terminal: React.FC<TerminalProps & AnimateProps> = ({ output, animate, onComplete }) => {
    const headerButtonColours = ['red', 'yellow', 'green']

    return (
        <div className='w-5/12 hidden xl:block'>
            <FadeIn animate={animate} onComplete={onComplete}>
                <div className='h-80 rounded-lg overflow-hidden shadow'>
                    <div className='h-8 flex justify-start items-center bg-gray-200'>
                        {headerButtonColours.map(c => <div className={`w-3 h-3 rounded-full ml-2.5 bg-${c}-500`} />)}
                    </div>
                    <div className='p-3 font-mono text-sm h-full bg-gray-800 text-white'>
                        {output.map((cmd, i) => <div key={i} className='whitespace-pre-wrap'>{cmd}</div>)}
                    </div>
                </div>
            </FadeIn>
        </div>
    )
}

export default Terminal