import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Map from '#re-map';
import MapContainer from '#re-map/MapContainer';
import MapBounds from '#re-map/MapBounds';

import { BBox } from '#types';
import { useGameplay } from '#hooks';

import UserInformationModal from './UserInformationModal';
import GameModeSelectionModal from './GameModeSelectionModal';
import AfterGameModal from './AfterGameModal';
import RegionMap from './RegionMap';
import Stats from './Stats';

import styles from './styles.css';

interface Props {
    className?: string;
}

const lightStyle = 'mapbox://styles/mapbox/light-v10';
const defaultBounds: BBox = [
    80.05858661752784,
    26.347836996368667,
    88.20166918432409,
    30.44702867091792,
];


type GameState = 'user-info' | 'mode-selection' | 'play' | 'finished';
type NextGameState = Exclude<GameState, 'user-info' | 'finished'>;
type GameMode = 'province' | 'district';

function Home(props: Props): React.ReactElement {
    const { className } = props;
    const [gameId, setGameId] = React.useState(new Date().getTime());

    // const [gameState, setGameState] = React.useState<GameState>('user-info');
    // const [nextGameState, setNextGameState]
    // = React.useState<NextGameState | undefined>('mode-selection');

    const [gameState, setGameState] = React.useState<GameState>('play');
    const [nextGameState, setNextGameState] = React.useState<NextGameState | undefined>(undefined);

    const [name, setName] = React.useState('');
    // const [mode, setMode] = React.useState<GameMode | undefined>(undefined);
    const [mode, setMode] = React.useState<GameMode | undefined>('province');

    const handleGameplayEnd = React.useCallback(() => {
        setGameState('finished');
        console.warn('game finished');
    }, [setGameState]);

    const {
        round,
        elapsed,
    } = useGameplay(gameId, gameState, handleGameplayEnd);

    const handleUserInfoStartClick = React.useCallback((userName) => {
        setName(userName);

        if (nextGameState) {
            setGameState(nextGameState);
            setNextGameState('play');
        }
    }, [nextGameState, setNextGameState]);

    const handleGameModeSelect = React.useCallback((gameMode) => {
        setMode(gameMode);

        if (nextGameState) {
            setGameState(nextGameState);
            setNextGameState(undefined);
        }
    }, [setMode, nextGameState]);

    const handlePlayAgainButtonClick = React.useCallback(() => {
        setGameState('mode-selection');
        setNextGameState('play');
        setGameId(new Date().getTime());
    }, [setGameState, setNextGameState, setGameId]);

    const handleRegionClick = React.useCallback((properties) => {
        console.warn('You clicked on', properties.title);
    }, []);

    return (
        <div className={_cs(className, styles.home)}>
            <Map
                mapStyle={lightStyle}
                mapOptions={{
                    logoPosition: 'bottom-left',
                    minZoom: 5,
                    bounds: defaultBounds,
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
            <Stats
                className={styles.stats}
                mode={mode}
                userName={name}
                elapsed={elapsed}
            />
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
                    onPlayAgainClick={handlePlayAgainButtonClick}
                />
            )}
        </div>
    );
}

export default Home;
