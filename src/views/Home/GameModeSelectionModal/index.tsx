import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { _cs } from '@togglecorp/fujs';

import Haze from '#components/Haze';
import Button from '#components/Button';

import { GameMode } from '#types';
import { gameModes } from '#utils/constants';

import styles from './styles.css';

interface Props {
    onModeSelect: (mode: string) => void;
    initialGameMode?: GameMode;
}

function GameModeSelectionModal(props: Props): React.ReactElement {
    const {
        onModeSelect,
        initialGameMode = 'provinceFixed',
    } = props;

    const [activeMode, setMode] = React.useState<GameMode>(initialGameMode);

    const modeKeys = Object.keys(gameModes);
    const handleGameModeButtonClick = React.useCallback((mode) => {
        setMode(mode);
    }, [setMode]);

    const handleSelectButtonClick = React.useCallback((mode) => {
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
                        <button
                            type="button"
                            key={mk}
                            className={_cs(activeMode === mk && styles.active, styles.gameModeCard)}
                            onClick={() => handleGameModeButtonClick(mk)}
                            name={mk}
                        >
                            <header className={styles.header}>
                                <h4 className={styles.heading}>
                                    { gameModes[mk as GameMode] }
                                </h4>
                            </header>
                            <div className={styles.content}>
                                <GrMapLocation className={styles.icon} />
                            </div>
                        </button>
                    ))}
                </div>
                <div className={styles.actions}>
                    <Button
                        name={activeMode}
                        onClick={handleSelectButtonClick}
                    >
                        Select
                    </Button>
                </div>
            </div>
        </Haze>
    );
}

export default GameModeSelectionModal;
