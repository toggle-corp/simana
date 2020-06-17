import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface ElapsedOutputProps {
    value: number;
    className?: string;
}

function ElapsedOutput(p: ElapsedOutputProps) {
    const {
        value,
        className,
    } = p;

    const totalSeconds = Math.floor(value / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return (
        <div className={_cs(className, styles.elapsedOutput)}>
            <div className={styles.min}>
                {minutes.toString().padStart(2, '00')}
            </div>
            <div className={styles.separator}>
                :
            </div>
            <div className={styles.sec}>
                {seconds.toString().padStart(2, '00')}
            </div>
        </div>
    );
}

export default ElapsedOutput;
