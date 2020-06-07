import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    Challenge,
    GameMode,
} from '#types';

import { MAX_ATTEMPTS } from '#utils/constants';
import {
    getMaxRounds,
    calculateScore,
} from '#utils/common';

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
    mode: GameMode,
}

function ScoreBoard(props: Props) {
    const {
        className,
        round,
        challenges,
        mode,
    } = props;

    const score = React.useMemo(() => (
        calculateScore(challenges)
    ), [challenges]);

    const currentChallange = challenges[round];

    return (
        <div className={_cs(className, styles.scoreBoard)}>
            <TextOutput
                label="Score"
                value={score}
            />
            <TextOutput
                label="Round"
                value={round + 1}
                limit={getMaxRounds(mode)}
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
