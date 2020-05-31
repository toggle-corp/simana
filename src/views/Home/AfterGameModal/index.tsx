import React from 'react';

import Haze from '#components/Haze';
import Button from '#components/Button';

import { Challange } from '#types';

import styles from './styles.css';

interface Props {
    onPlayAgainClick: () => void;
    challanges: Challange[];
}

function AfterGameModal(props: Props): React.ReactElement {
    const {
        onPlayAgainClick,
        challanges,
    } = props;

    const score = React.useMemo(() => (
        challanges.reduce((acc, val) => {
            if (val.result === 'pass') {
                return acc + 500;
            }

            return acc;
        }, 0)
    ), [challanges]);

    return (
        <Haze>
            <div className={styles.afterGamePlayModal}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        Game over
                    </h2>
                </header>
                <div className={styles.content}>
                    <div className={styles.scoreLabel}>
                        Your score
                    </div>
                    <div className={styles.score}>
                        { score }
                    </div>
                    <div className={styles.actions}>
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
