import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    Challenge,
} from '#types';

import {
    MAX_ROUNDS,
    MAX_ATTEMPTS,
} from '#utils/constants';

import styles from './styles.css';

interface TextOutputProps {
    value: number;
    label: React.ReactNode;
    limit?: number;
}

function TextOutput(p: TextOutputProps) {
    const {
        label,
        value,
        limit,
    } = p;

    return (
        <div className={styles.textOutput}>
            <div className={styles.label}>
                { label }
            </div>
            <div className={styles.value}>
                { limit ? (
                    <>
                        <div className={styles.current}>
                            { value }
                        </div>
                        <div className={styles.separator}>
                            /
                        </div>
                        <div className={styles.limit}>
                            { limit }
                        </div>
                    </>
                ) : (
                    value
                )}
            </div>
        </div>
    );
}

interface Props {
    challenges: Challenge[]
    className?: string;
    round: number;
}

function ScoreBoard(props: Props) {
    const {
        className,
        round,
        challenges,
    } = props;

    const score = React.useMemo(() => (
        challenges.reduce((acc, val) => {
            if (val.result === 'pass') {
                return acc + 500;
            }

            return acc;
        }, 0)
    ), [challenges]);

    const currentChallange = challenges[round];

    return (
        <div className={_cs(className, styles.scoreBoard)}>
            <TextOutput
                label="Score"
                value={score}
            />
            <TextOutput
                label="Rounds"
                value={round + 1}
                limit={MAX_ROUNDS}
            />
            <TextOutput
                label="Attempts"
                value={currentChallange?.attempts?.length || 0}
                limit={MAX_ATTEMPTS}
            />
        </div>
    );
}

export default ScoreBoard;
