import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { Challenge } from '#types';

import styles from './styles.css';

interface Props {
    className?: string;
    challenge: Challenge;
}

function ChallengeView(p: Props) {
    const {
        challenge,
        className,
    } = p;

    return (
        <div className={_cs(className, styles.challenge)}>
            { challenge?.title }
        </div>
    );
}

export default React.memo(ChallengeView);
