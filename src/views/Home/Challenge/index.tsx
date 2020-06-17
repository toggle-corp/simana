import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    Challenge,
    GameMode,
} from '#types';
import { ROUND_DURATION } from '#utils/constants';
import { getMaxDuration } from '#utils/common';

import styles from './styles.css';

interface Props {
    className?: string;
    challenge: Challenge;
    round: number;
    mode?: GameMode;
}

function ChallengeView(p: Props) {
    const {
        challenge,
        className,
        round,
        mode,
    } = p;

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const { current } = ref;
        if (current) {
            if (mode === 'province' || mode === 'district') {
                current.style.setProperty('--round-duration', `${getMaxDuration(mode)}ms`);
            } else {
                current.style.setProperty('--round-duration', `${ROUND_DURATION}ms`);
            }
        }
    }, [ref, mode]);

    return (
        <div
            ref={ref}
            className={_cs(className, styles.challenge)}
        >
            <div
                className={styles.title}
                key={round}
            >
                {`${round + 1}. ${challenge.title}`}
            </div>
        </div>
    );
}

export default React.memo(ChallengeView);
