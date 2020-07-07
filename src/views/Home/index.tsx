import React, { useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';

import {
    GameMode,
    Message,
    MapState,
} from '#types';
import useGameplay from '#hooks/useGameplay';
import useGameState from '#hooks/useGameState';
import { getRandomPositiveMessage } from '#utils/common';
import {
    districtIdByCode,
    provinceIdByCode,
} from '#utils/constants';
import RoundButton from '#components/RoundButton';
import GameStartMessage from '#components/GameStartMessage';
import Fact from '#components/Fact';

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


const HINT_HIGHLIGHT_TIMEOUT = 2800;
const CLICK_HIGHLIGHT_TIMEOUT = 3000;

const gameModeToCodeMap: {
    [key in GameMode]: { [key: string]: number };
} = {
    province: provinceIdByCode,
    provinceFixed: provinceIdByCode,
    district: districtIdByCode,
    districtFixed: districtIdByCode,
};

function Home(props: Props): React.ReactElement {
    const { className } = props;
    const [clickedMapState, setClickedMapState] = React.useState<MapState | undefined>();
    const [hintMapState, setHintMapState] = React.useState<MapState | undefined>();

    const [message, setMessage] = React.useState<Message | undefined>(undefined);
    const [mapSourceLoaded, setMapSourceLoaded] = React.useState<boolean>(false);
    const [roundStartTimestamp, setRoundStartTimestamp] = React.useState<number>(0);

    const gameState = useGameState(mapSourceLoaded);

    const [name, setName] = React.useState('Anonymous');
    const [mode, setMode] = React.useState<GameMode | undefined>();

    const answerRef = React.useRef<string | undefined>();
    const clickedTimeoutRef = React.useRef<number | undefined>();
    const hintTimeoutRef = React.useRef<number | undefined>();

    const handleGameplayEnd = React.useCallback((ticks: number[]) => {
        const totalDuration = ticks.reduce((acc, val) => acc + val, 0);
        gameState.endGame();
    }, [gameState]);

    const showCorrectAnswer = React.useCallback((gameMode: GameMode, regionCode: string) => {
        setHintMapState({
            id: gameModeToCodeMap[gameMode][regionCode],
            value: 'neutral',
        });
        window.clearTimeout(hintTimeoutRef.current);
        hintTimeoutRef.current = window.setTimeout(() => {
            setHintMapState(undefined);
        }, HINT_HIGHLIGHT_TIMEOUT);
    }, [setHintMapState]);

    const handleRoundEnd = React.useCallback(() => {
        if (gameState.current === 'round' && mode && answerRef.current) {
            showCorrectAnswer(mode, answerRef.current);
            gameState.endCurrentRound();
        }
    }, [showCorrectAnswer, answerRef, mode, gameState]);

    const handleRoundStart = React.useCallback((timestamp) => {
        setRoundStartTimestamp(timestamp);
    }, [setRoundStartTimestamp]);

    const {
        ticks,
        round,
        addAttempt,
        challenges,
    } = useGameplay(gameState.current, mode, handleRoundStart, handleRoundEnd, handleGameplayEnd);

    React.useEffect(() => {
        const challange = challenges[round];
        answerRef.current = challange?.answer;
    }, [challenges, round, answerRef]);

    const handleUserInfoStartClick = React.useCallback((userName) => {
        setName(userName);
        gameState.next();
    }, [gameState]);

    const handleGameModeSelect = React.useCallback((gameMode) => {
        setMode(gameMode);
        gameState.next();
    }, [gameState, setMode]);

    const handlePlayAgainButtonClick = React.useCallback(() => {
        gameState.startGame();
    }, [gameState]);

    const handleNicknameButtonClick = React.useCallback(() => {
        gameState.navigateTo('user-info');
    }, [gameState]);

    const handleGameModeButtonClick = React.useCallback(() => {
        gameState.navigateTo('mode-selection');
    }, [gameState]);

    const handleSurrenderButtonClick = React.useCallback(() => {
        gameState.navigateTo('game-end');
    }, [gameState]);

    const handleRestartRoundButtonClick = React.useCallback(() => {
        gameState.startGame();
    }, [gameState]);

    const handleRegionClick = React.useCallback((properties) => {
        if (gameState.current === 'round' && mode) {
            if (addAttempt(properties.code) === 'fail' && answerRef.current) {
                showCorrectAnswer(mode, answerRef.current);
            }

            if (properties.code === answerRef.current) {
                setMessage({
                    text: getRandomPositiveMessage(),
                    timestamp: new Date().getTime(),
                    type: 'good',
                });
                setClickedMapState({
                    id: gameModeToCodeMap[mode][properties.code],
                    value: 'good',
                });
            } else {
                setMessage({
                    text: `Oops! you clicked on ${properties.title}`,
                    timestamp: new Date().getTime(),
                    type: 'bad',
                });
                setClickedMapState({
                    id: gameModeToCodeMap[mode][properties.code],
                    value: 'bad',
                });
            }

            window.clearTimeout(clickedTimeoutRef.current);
            clickedTimeoutRef.current = window.setTimeout(() => {
                setClickedMapState(undefined);
            }, CLICK_HIGHLIGHT_TIMEOUT);
        }
    }, [gameState, mode, addAttempt, setMessage, answerRef, setClickedMapState, showCorrectAnswer]);

    const handleMapSourceLoad = React.useCallback(() => {
        setMapSourceLoaded(true);
    }, [setMapSourceLoaded]);

    const roundRunning = React.useMemo(() => (
        gameState.current === 'round-start'
        || gameState.current === 'round'
        || gameState.current === 'round-end'
        || gameState.current === 'pre-game-end'
    ), [gameState]);

    return (
        <div className={_cs(className, styles.home)}>
            { gameState.current === 'user-info' && (
                <UserInformationModal
                    onStartClick={handleUserInfoStartClick}
                />
            )}
            { gameState.current === 'mode-selection' && (
                <GameModeSelectionModal
                    onModeSelect={handleGameModeSelect}
                />
            )}
            <RegionMap
                className={styles.mapContainer}
                mode={mode}
                onMapSourceLoad={handleMapSourceLoad}
                onRegionClick={handleRegionClick}
                clickedMapState={clickedMapState}
                hintMapState={hintMapState}
            />
            { gameState.current === 'game-start' && !mapSourceLoaded && (
                <div className={styles.mapLoadingMessage}>
                    Loading map...
                </div>
            )}
            <MessageView
                className={styles.message}
                message={message}
            />
            {mode && (roundRunning || gameState.current === 'initialize') && (
                <>
                    <Stats
                        className={styles.stats}
                        mode={mode}
                        username={name}
                        startTimestamp={roundStartTimestamp}
                        state={gameState.current}
                    />
                    <ScoreBoard
                        mode={mode}
                        className={styles.scoreBoard}
                        round={round}
                        challenges={challenges}
                    />
                </>
            )}
            { gameState.current === 'round' && (
                <Challenge
                    round={round}
                    className={styles.challenge}
                    challenge={challenges[round]}
                    mode={mode}
                />
            )}
            { gameState.current === 'round' && (
                <Fact
                    className={styles.fact}
                    regionTitle={challenges[round]?.regionTitle}
                    facts={challenges[round]?.facts}
                />
            )}
            { gameState.current === 'initialize' && mapSourceLoaded && (
                <GameStartMessage
                    className={styles.gameStartMessage}
                />
            )}
            { gameState.current === 'game-end' && mode && (
                <AfterGameModal
                    mode={mode}
                    challenges={challenges}
                    onPlayAgainClick={handlePlayAgainButtonClick}
                    onGameModeClick={handleGameModeButtonClick}
                    onNicknameClick={handleNicknameButtonClick}
                    username={name}
                    ticks={ticks}
                />
            )}
            { roundRunning && (
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
