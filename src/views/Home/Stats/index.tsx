import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FaUserSecret } from 'react-icons/fa';

import {
    ROUND_DURATION,
    gameModes,
} from '#utils/constants';
import { GameMode } from '#types';

import styles from './styles.css';

interface ElapsedOutputProps {
    value: number;
}

function ElapsedOutput(p: ElapsedOutputProps) {
    const { value } = p;

    const totalSeconds = Math.floor(value / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return (
        <div className={styles.elapsedOutput}>
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

interface TextOutputProps {
    value: React.ReactNode;
    label: React.ReactNode;
    className?: string;
}

function TextOutput(p: TextOutputProps) {
    const {
        label,
        value,
        className,
    } = p;

    return (
        <div className={_cs(className, styles.textOutput)}>
            <div className={styles.label}>
                { label }
            </div>
            <div className={styles.value}>
                { value }
            </div>
        </div>
    );
}

interface Props {
    lapElapsed: number;
    mode: GameMode;
    username: string;
    className?: string;
}

function Stats(props: Props) {
    const {
        lapElapsed,
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
            <TextOutput
                className={styles.timeRemaining}
                label="Time remaining:"
                value={(
                    <ElapsedOutput
                        value={ROUND_DURATION - lapElapsed}
                    />
                )}
            />
            <TextOutput
                className={styles.username}
                label={<FaUserSecret />}
                value={username}
            />
        </div>
    );
}

export default Stats;
