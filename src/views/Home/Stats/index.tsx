import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props {
}

function ElapsedOutput(p) {
    const { value } = p;

    const totalSeconds = Math.floor(value / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return (
        <div className={styles.elapsedOutput}>
            <div className={styles.min}>
                {minutes}
            </div>
            <div className={styles.separator}>
                :
            </div>
            <div className={styles.sec}>
                {seconds}
            </div>
        </div>
    );
}

function Stats(props: Props) {
    const {
        elapsed,
        mode,
        username,
        className,
        round,
    } = props;

    return (
        <div className={_cs(className, styles.stats)}>
            <div className={styles.username}>
                { username }
            </div>
            <div className={styles.mode}>
                { mode }
            </div>
            <div className={styles.round}>
                { round }
            </div>
            <ElapsedOutput
                value={elapsed}
            />
        </div>
    );
}

export default Stats;
