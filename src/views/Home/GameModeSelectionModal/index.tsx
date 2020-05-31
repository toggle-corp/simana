import React from 'react';
import { GrMapLocation } from 'react-icons/gr';

import Haze from '#components/Haze';
import Button from '#components/Button';

import { gameModes } from '#utils/constants';

import styles from './styles.css';

interface Props {
    onModeSelect: (mode: string) => void;
}

function GameModeSelectionModal(props: Props): React.ReactElement {
    const {
        onModeSelect,
    } = props;

    const modeKeys = Object.keys(gameModes);
    const handleGameModeSelection = React.useCallback((mode) => {
        onModeSelect(mode);
    }, [onModeSelect]);

    return (
        <Haze>
            <div className={styles.gameModeSelectionModal}>
                <header className={styles.header}>
                    <h2 className={styles.heading}>
                        Select game type
                    </h2>
                </header>
                <div className={styles.content}>
                    { modeKeys.map((mk) => (
                        <div
                            key={mk}
                            className={styles.gameModeCard}
                        >
                            <header className={styles.header}>
                                <h3 className={styles.heading}>
                                    { gameModes[mk] }
                                </h3>
                            </header>
                            <div className={styles.content}>
                                <GrMapLocation className={styles.icon} />
                            </div>
                            <div className={styles.actions}>
                                <Button
                                    name={mk}
                                    onClick={handleGameModeSelection}
                                >
                                    Select
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Haze>
    );
}

export default GameModeSelectionModal;
