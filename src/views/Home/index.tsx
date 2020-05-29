import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Map from '#re-map';
import MapContainer from '#re-map/MapContainer';
import MapSource from '#re-map/MapSource';
import MapLayer from '#re-map/MapSource/MapLayer';

import { BBox } from '#types';

import UserInformationModal from './UserInformationModal';
import GameModeSelectionModal from './GameModeSelectionModal';

import styles from './styles.css';

interface Props {
    className?: string;
}

const lightStyle = 'mapbox://styles/mapbox/light-v10';
const mapSources = {
    nepal: {
        url: 'mapbox://togglecorp.2pw3lud3',
        layers: {
            province: 'provincegeo',
            district: 'districtgeo',
            municipality: 'municipalitygeo',
            ward: 'wardgeo',
        },
    },
    nepalCentroid: {
        url: 'mapbox://togglecorp.1j8vj54j',
        layers: {
            province: 'provincecentroidgeo',
            district: 'districtcentroidgeo',
            municipality: 'municipalitycentroidgeo',
            ward: 'wardcentroidgeo',
        },
    },
};
const defaultBounds: BBox = [
    80.05858661752784,
    26.347836996368667,
    88.20166918432409,
    30.44702867091792,
];


type GameState = 'user-info' | 'mode-selection' | 'play';
type NextGameState = Omit<GameState, 'user-info'>;
type GameMode = 'province' | 'district';

function Home(props: Props): React.ReactElement {
    const { className } = props;
    const [gameState, setGameState] = React.useState<GameState>('user-info');
    const [nextGameState, setNextGameState] = React.useState<NextGameState | undefined>('mode-selection');
    const [name, setName] = React.useState('');
    const [mode, setMode] = React.useState<GameMode | undefined>(undefined);

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

    return (
        <div className={_cs(className, styles.home)}>
            <Map
                mapStyle={lightStyle}
                mapOptions={{
                    logoPosition: 'bottom-left',
                    minZoom: 5,
                    bounds: defaultBounds,
                }}
                scaleControlShown
                navControlShown
                scaleControlPosition="bottom-right"
                navControlPosition="top-right"
            >
                <MapContainer className={styles.mapContainer} />
                <MapSource
                    sourceKey="country"
                    sourceOptions={{
                        type: 'vector',
                        url: mapSources.nepal.url,
                    }}
                >
                    { mode === 'province' && (
                        <>
                            <MapLayer
                                layerKey="province-fill"
                                // onClick={}
                                layerOptions={{
                                    'source-layer': mapSources.nepal.layers.province,
                                    type: 'fill',
                                }}
                            />
                            <MapLayer
                                layerKey="province-outline"
                                layerOptions={{
                                    'source-layer': mapSources.nepal.layers.province,
                                    type: 'line',
                                }}
                            />
                        </>
                    )}
                    { mode === 'district' && (
                        <>
                            <MapLayer
                                layerKey="district-fill"
                                // onClick={}
                                layerOptions={{
                                    'source-layer': mapSources.nepal.layers.district,
                                    type: 'fill',
                                    paint: {
                                        'fill-opacity': 0.5,
                                    },
                                }}
                            />
                            <MapLayer
                                layerKey="district-outline"
                                layerOptions={{
                                    'source-layer': mapSources.nepal.layers.district,
                                    type: 'line',
                                }}
                            />
                        </>
                    )}
                </MapSource>
            </Map>
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
        </div>
    );
}

export default Home;
