import React from 'react';
import { addSeparator } from '@togglecorp/fujs';

import Haze from '#components/Haze';
import Button from '#components/Button';

import {
    Challenge,
    GameMode,
} from '#types';
import { calculateScore } from '#utils/common';
import { gameModes } from '#utils/constants';

import TextOutput from '#components/TextOutput';
import ElapsedOutput from '#components/ElapsedOutput';

import styles from './styles.css';

interface Props {
    onPlayAgainClick: () => void;
    onNicknameClick: () => void;
    onGameModeClick: () => void;
    challenges: Challenge[];
    mode: GameMode,
    elapsed: number,
    username: string;
}

function AfterGameModal(props: Props): React.ReactElement {
    const {
        onPlayAgainClick,
        challenges,
        onGameModeClick,
        onNicknameClick,
        mode,
        elapsed,
        username,
    } = props;

    const score = React.useMemo(() => (
        calculateScore(challenges)
    ), [challenges]);

    return (
        <Haze>
            <div className={styles.afterGamePlayModal}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        Game over
                    </h2>
                </header>
                <div className={styles.content}>
                    <div className={styles.score}>
                        <div className={styles.label}>
                            {`${username} scored:`}
                        </div>
                        <div className={styles.value}>
                            { addSeparator(score) }
                        </div>
                    </div>
                    <TextOutput
                        className={styles.mode}
                        label="Mode:"
                        value={gameModes[mode]}
                    />
                    <TextOutput
                        className={styles.time}
                        label="Time:"
                        value={(
                            <ElapsedOutput
                                value={elapsed}
                            />
                        )}
                    />
                </div>
                <div className={styles.actions}>
                    <Button onClick={onNicknameClick}>
                        Nickname
                    </Button>
                    <Button onClick={onGameModeClick}>
                        Game mode
                    </Button>
                    <Button onClick={onPlayAgainClick}>
                        Play again
                    </Button>
                </div>
            </div>
        </Haze>
    );
}

export default AfterGameModal;
