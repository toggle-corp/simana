import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Haze from '#components/Haze';
import Button from '#components/Button';
import styles from './styles.css';

interface Props {
}

function AfterGameModal(props: Props): React.ReactElement {
    const {
        score,
        onPlayAgainClick,
    } = props;

    return (
        <Haze>
            <div className={styles.afterGamePlayModal}>
                <div className={styles.score}>
                    { score }
                </div>
                <Button onClick={onPlayAgainClick}>
                    Play again
                </Button>
            </div>
        </Haze>
    );
}

export default AfterGameModal;
