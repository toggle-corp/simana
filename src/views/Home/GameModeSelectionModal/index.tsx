import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { GrMapLocation } from 'react-icons/gr';

import Haze from '#components/Haze';
import Button from '#components/Button';

import styles from './styles.css';

interface Props {
    onModeSelect: (mode: string) => void;
}

const gameModes = {
    province: 'Province mode',
    district: 'District mode',
};

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
