import React from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    ROUND_DURATION,
    gameModes,
    avatars,
} from '#utils/constants';
import {
    GameMode,
    GameState,
    AvatarKey,
} from '#types';

import ElapsedOutput from '#components/ElapsedOutput';
import TextOutput from '#components/TextOutput';

import styles from './styles.css';


interface Props {
    startTimestamp: number;
    mode: GameMode;
    state: GameState;
    username: string;
    avatar: AvatarKey;
    className?: string;
}

function Stats(props: Props) {
    const {
        startTimestamp,
        mode,
        state,
        username,
        avatar,
        className,
    } = props;


    return (
        <div className={_cs(className, styles.stats)}>
            <TextOutput
                className={styles.gameMode}
                label="Game mode:"
                value={gameModes[mode]}
            />
            {(mode === 'province' || mode === 'district') ? (
                <TextOutput
                    className={styles.timeRemaining}
                    label="Time elapsed:"
                    value={(
                        <ElapsedOutput
                            initialTimestamp={startTimestamp}
                            run={state === 'round'}
                        />
                    )}
                />
            ) : (
                <TextOutput
                    className={styles.timeRemaining}
                    label="Time remaining:"
                    value={(
                        <ElapsedOutput
                            initialTimestamp={startTimestamp}
                            countdown
                            targetDuration={ROUND_DURATION}
                            run={state === 'round'}
                        />
                    )}
                />
            )}
            <TextOutput
                className={styles.username}
                label={(
                    <>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img
                            className={styles.avatar}
                            src={avatars[avatar]}
                        />
                    </>
                )}
                value={username}
            />
        </div>
    );
}

export default Stats;
