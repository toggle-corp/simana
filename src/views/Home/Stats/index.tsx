import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FaUserSecret } from 'react-icons/fa';

import {
    ROUND_DURATION,
    gameModes,
} from '#utils/constants';
import { GameMode } from '#types';

import ElapsedOutput from '#components/ElapsedOutput';
import TextOutput from '#components/TextOutput';

import styles from './styles.css';


interface Props {
    lapElapsed: number;
    elapsed: number;
    mode: GameMode;
    username: string;
    className?: string;
}

function Stats(props: Props) {
    const {
        lapElapsed,
        elapsed,
        mode,
        username,
        className,
    } = props;


    return (
        <div className={_cs(className, styles.stats)}>
            <TextOutput
                className={styles.gameMode}
                label="Game type:"
                value={gameModes[mode]}
            />
            {(mode === 'province' || mode === 'district') ? (
                <TextOutput
                    className={styles.timeRemaining}
                    label="Time elapsed:"
                    value={(
                        <ElapsedOutput
                            value={elapsed}
                        />
                    )}
                />
            ) : (
                <TextOutput
                    className={styles.timeRemaining}
                    label="Time remaining:"
                    value={(
                        <ElapsedOutput
                            value={ROUND_DURATION - lapElapsed}
                        />
                    )}
                />
            )}
            <TextOutput
                className={styles.username}
                label={<FaUserSecret />}
                value={username}
            />
        </div>
    );
}

export default Stats;
