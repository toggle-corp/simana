import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

interface Props {
    className?: string;
}

function GameStartMessage(p: Props) {
    const { className } = p;

    return (
        <div className={_cs(className, styles.gameStartMessage)}>
            <div className={styles.ready}>
                Ready!
            </div>
            <div className={styles.getSet}>
                Get set!
            </div>
            <div className={styles.go}>
                Go! Go! Go!
            </div>
        </div>
    );
}

export default GameStartMessage;
