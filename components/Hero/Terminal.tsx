import React from 'react';
import { TerminalProps } from '../../types';
import FadeIn, { AnimateProps } from '../FadeIn'
import styles from '../../styles/Hero.module.sass'

const Terminal: React.FC<TerminalProps & AnimateProps> = ({ output, animate, onComplete }) => {
    return (
        <div className={styles.terminalContainer}>
            <FadeIn animate={animate} onComplete={onComplete}>
                <div className={styles.terminal}>
                    <div className={styles.terminalHeader}>
                        <div className={`${styles.headerButton} ${styles.red}`}></div>
                        <div className={`${styles.headerButton} ${styles.yellow}`}></div>
                        <div className={`${styles.headerButton} ${styles.green}`}></div>
                    </div>
                    <div className={styles.terminalWindow}>
                        {output.map((cmd, i) => <div key={i}>{cmd}</div>)}
                    </div>
                </div>
            </FadeIn>
        </div>
    );
}

export default Terminal;