import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FaUserSecret } from 'react-icons/fa';

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

interface TextOutputProps {
    value: React.ReactNode;
    label: React.ReactNode;
}

function TextOutput(p: TextOutputProps) {
    const {
        label,
        value,
    } = p;

    return (
        <div className={styles.textOutput}>
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
    elapsed: number;
    mode: GameMode;
    username: string;
    className?: string;
    round: number;
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
            <TextOutput
                label={<FaUserSecret />}
                value={username}
            />
            <TextOutput
                label="Game mode:"
                value={mode}
            />
            <TextOutput
                label="Round:"
                value={round + 1}
            />
            <TextOutput
                label="Time elapsed:"
                value={(
                    <ElapsedOutput
                        value={elapsed}
                    />
                )}
            />
        </div>
    );
}

export default Stats;
