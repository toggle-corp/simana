import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Map from '#re-map';
import MapContainer from '#re-map/MapContainer';
import MapBounds from '#re-map/MapBounds';

import {
    BBox,
    GameMode,
    GameState,
} from '#types';
import { useGameplay } from '#hooks';

import UserInformationModal from './UserInformationModal';
import GameModeSelectionModal from './GameModeSelectionModal';
import AfterGameModal from './AfterGameModal';
import RegionMap from './RegionMap';
import Stats from './Stats';
import Challenge from './Challenge';

import styles from './styles.css';

interface Props {
    className?: string;
}

// const lightStyle = 'mapbox://styles/mapbox/light-v10';
const blankStyle = 'mapbox://styles/togglecorp/ck9av67fu0i441ipd23xm7o0w';

const defaultBounds: BBox = [
    80.05858661752784,
    26.347836996368667,
    88.20166918432409,
    30.44702867091792,
];


function Home(props: Props): React.ReactElement {
    const { className } = props;
    const [gameId, setGameId] = React.useState(new Date().getTime());

    const [gameState, setGameState] = React.useState<GameState>('user-info');

    const [name, setName] = React.useState('fhx');
    const [mode, setMode] = React.useState<GameMode | undefined>(undefined);

    const handleGameplayEnd = React.useCallback(() => {
        setGameState('finished');
        console.info('game finished...');
    }, [setGameState]);

    const {
        round,
        elapsed,
        addAttempt,
        challenges,
    } = useGameplay(gameId, gameState, mode, handleGameplayEnd);

    React.useEffect(() => {
        let timeout: number | undefined;
        if (gameState === 'initialize') {
            const delay = 3000;
            console.info('game starts in', delay / 3000);
            timeout = window.setTimeout(() => { setGameState('play'); }, delay);
        }
        return () => { window.clearTimeout(timeout); };
    }, [gameState, setGameState]);

    const handleUserInfoStartClick = React.useCallback((userName) => {
        setName(userName);
        setGameState('mode-selection');
    }, [setGameState]);

    const handleGameModeSelect = React.useCallback((gameMode) => {
        const newGameId = new Date().getTime();
        setMode(gameMode);
        setGameId(newGameId);
        setGameState('initialize');
    }, [setMode, setGameId]);

    const handlePlayAgainButtonClick = React.useCallback(() => {
        setGameState('mode-selection');
    }, [setGameState]);

    const handleRegionClick = React.useCallback((properties) => {
        console.info('You clicked on', properties.title);
        addAttempt(properties.code);
    }, [addAttempt]);

    return (
        <div className={_cs(className, styles.home)}>
            <Map
                mapStyle={blankStyle}
                mapOptions={{
                    logoPosition: 'bottom-left',
                    minZoom: 5,
                    bounds: defaultBounds,
                    interactive: false,
                }}
            >
                <MapBounds
                    bounds={defaultBounds}
                    padding={120}
                />
                <MapContainer className={styles.mapContainer} />
                <RegionMap
                    mode={mode}
                    onRegionClick={handleRegionClick}
                />
            </Map>
            {(gameState === 'play' || gameState === 'initialize') && (
                <Stats
                    className={styles.stats}
                    mode={mode}
                    username={name}
                    elapsed={elapsed}
                    round={round}
                />
            )}
            { gameState === 'play' && (
                <Challenge
                    className={styles.challenge}
                    challenge={challenges[round]}
                />
            )}
            { gameState === 'initialize' && (
                <div className={styles.initializeMessage}>
                    <div className={styles.ready}>
                        Ready!
                    </div>
                    <div className={styles.getSet}>
                        Get set!
                    </div>
                    <div className={styles.go}>
                        Go! Go! Go!
                    </div>
                </div>
            )}
            { gameState === 'user-info' && (
                <UserInformationModal
                    onStartClick={handleUserInfoStartClick}
                />
            )}
            { gameState === 'mode-selection' && (
                <GameModeSelectionModal
                    onModeSelect={handleGameModeSelect}
                />
            )}
            { gameState === 'finished' && (
                <AfterGameModal
                    score={round}
                    challenges={challenges}
                    onPlayAgainClick={handlePlayAgainButtonClick}
                />
            )}
        </div>
    );
}

export default Home;
