import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { Challenge } from '#types';
import { ROUND_DURATION } from '#utils/constants';

import styles from './styles.css';

interface Props {
    className?: string;
    challenge: Challenge;
    round: number;
}

function ChallengeView(p: Props) {
    const {
        challenge,
        className,
        round,
    } = p;

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const { current } = ref;
        if (current) {
            current.style.setProperty('--round-duration', `${ROUND_DURATION}ms`);
        }
    }, [ref]);

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
