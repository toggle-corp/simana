import React from 'react';

import Haze from '#components/Haze';
import Button from '#components/Button';

import { Challenge } from '#types';

import styles from './styles.css';

interface Props {
    onPlayAgainClick: () => void;
    onNicknameClick: () => void;
    onGameModeClick: () => void;
    challenges: Challenge[];
}

function AfterGameModal(props: Props): React.ReactElement {
    const {
        onPlayAgainClick,
        challenges,
        onGameModeClick,
        onNicknameClick,
    } = props;

    const score = React.useMemo(() => (
        challenges.reduce((acc, val) => {
            if (val.result === 'pass') {
                return acc + 500;
            }

            return acc;
        }, 0)
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
                            Your score
                        </div>
                        <div className={styles.value}>
                            { score }
                        </div>
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
            </div>
        </Haze>
    );
}

export default AfterGameModal;
