import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';

import Map from '#re-map';
import MapContainer from '#re-map/MapContainer';
import MapBounds from '#re-map/MapBounds';

import {
    BBox,
    GameMode,
    GameState,
    Message,
} from '#types';
import { useGameplay } from '#hooks';
import { getRandomPositiveMessage } from '#utils/common';
import RoundButton from '#components/RoundButton';

import UserInformationModal from './UserInformationModal';
import GameModeSelectionModal from './GameModeSelectionModal';
import AfterGameModal from './AfterGameModal';
import RegionMap from './RegionMap';
import Stats from './Stats';
import Challenge from './Challenge';
import ScoreBoard from './ScoreBoard';
import MessageView from './Message';

import styles from './styles.css';

interface Props {
    className?: string;
}

// const lightStyle = 'mapbox://styles/mapbox/light-v10';
const blankStyle = 'mapbox://styles/togglecorp/ckawhdhe23if41ipd9kcwxaa6';

const defaultBounds: BBox = [
    80.05858661752784,
    26.347836996368667,
    88.20166918432409,
    30.44702867091792,
];


function Home(props: Props): React.ReactElement {
    const { className } = props;
    const [gameId, setGameId] = React.useState(new Date().getTime());

    const [message, setMessage] = React.useState<Message | undefined>(undefined);
    const [gameState, setGameState] = React.useState<GameState>('user-info');

    const [name, setName] = React.useState('fhx');
    const [mode, setMode] = React.useState<GameMode | undefined>(undefined);
    const answerRef = React.useRef<string | undefined>(undefined);

    const handleGameplayEnd = React.useCallback(() => {
        setGameState('finished');
        console.info('game finished...');
    }, [setGameState]);

    const {
        round,
        elapsed,
        lapElapsed,
        addAttempt,
        challenges,
    } = useGameplay(gameId, gameState, mode, handleGameplayEnd);

    React.useEffect(() => {
        const challange = challenges[round];
        answerRef.current = challange?.answer;
    }, [challenges, round, answerRef]);

    React.useEffect(() => {
        let timeout: number | undefined;
        if (gameState === 'initialize') {
            const delay = 3000;
            console.info('game starts in', delay / 1000);
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
        setGameState('initialize');
        setGameId(new Date().getTime());
    }, [setGameState, setGameId]);
    const handleNicknameButtonClick = React.useCallback(() => {
        setGameState('user-info');
    }, [setGameState]);
    const handleGameModeButtonClick = React.useCallback(() => {
        setGameState('mode-selection');
    }, [setGameState]);

    const handleSurrenderButtonClick = React.useCallback(() => {
        setGameState('finished');
    }, [setGameState]);

    const handleRestartRoundButtonClick = React.useCallback(() => {
        setGameState('initialize');
        setGameId(new Date().getTime());
    }, [setGameState, setGameId]);

    const handleRegionClick = React.useCallback((properties) => {
        addAttempt(properties.code);

        if (properties.code === answerRef.current) {
            setMessage({
                text: getRandomPositiveMessage(),
                timestamp: new Date().getTime(),
                type: 'good',
            });
        } else {
            setMessage({
                text: `Oops! you clicked on ${properties.title}`,
                timestamp: new Date().getTime(),
                type: 'bad',
            });
        }
    }, [addAttempt, setMessage, answerRef]);

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
                scaleControlShown={false}
                navControlShown={false}
            >
                <MapBounds
                    bounds={defaultBounds}
                    padding={200}
                />
                <MapContainer className={styles.mapContainer} />
                { mode && (
                    <RegionMap
                        mode={mode}
                        onRegionClick={handleRegionClick}
                    />
                )}
            </Map>
            {mode && (gameState === 'play' || gameState === 'initialize') && (
                <>
                    <Stats
                        className={styles.stats}
                        mode={mode}
                        username={name}
                        lapElapsed={lapElapsed}
                        elapsed={elapsed}
                    />
                    <ScoreBoard
                        mode={mode}
                        className={styles.scoreBoard}
                        round={round}
                        challenges={challenges}
                    />
                </>
            )}
            <MessageView
                className={styles.message}
                message={message}
            />
            { gameState === 'play' && (
                <Challenge
                    round={round}
                    className={styles.challenge}
                    challenge={challenges[round]}
                    mode={mode}
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
                    challenges={challenges}
                    onPlayAgainClick={handlePlayAgainButtonClick}
                    onGameModeClick={handleGameModeButtonClick}
                    onNicknameClick={handleNicknameButtonClick}
                />
            )}
            { gameState === 'play' && (
                <div className={styles.activeGameActions}>
                    <RoundButton
                        tooltip="Restart round"
                        onClick={handleRestartRoundButtonClick}
                    >
                        <GrPowerReset />
                    </RoundButton>
                    <RoundButton
                        onClick={handleSurrenderButtonClick}
                        tooltip="End game"
                    >
                        <IoMdClose />
                    </RoundButton>
                </div>
            )}
        </div>
    );
}

export default Home;
