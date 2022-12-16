import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';
import { GrPowerReset } from 'react-icons/gr';
import { tx } from '@transifex/native';
import { T, useT, LanguagePicker } from '@transifex/react';


import {
    GameMode,
    Message,
    MapState,
    AvatarKey,
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

tx.init({ token: process.env.REACT_APP_TRANSIFEX_TOKEN, filterTags: 'gameplay' });

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
    const t = useT();
    const restartTooltip = t('Restart round');
    const endgameTooltip = t('End game');

    const [clickedMapState, setClickedMapState] = React.useState<MapState | undefined>();
    const [hintMapState, setHintMapState] = React.useState<MapState | undefined>();

    const [message, setMessage] = React.useState<Message | undefined>(undefined);
    const [mapSourceLoaded, setMapSourceLoaded] = React.useState<boolean>(false);
    const [roundStartTimestamp, setRoundStartTimestamp] = React.useState<number>(0);

    const gameState = useGameState(mapSourceLoaded);

    const [name, setName] = React.useState('');
    const [avatar, setAvatar] = React.useState<AvatarKey>('avatar1');
    const [mode, setMode] = React.useState<GameMode | undefined>();

    const answerRef = React.useRef<string | undefined>();
    const clickedTimeoutRef = React.useRef<number | undefined>();
    const hintTimeoutRef = React.useRef<number | undefined>();

    const handleGameplayEnd = React.useCallback((ticks: number[]) => {
        const totalDuration = ticks.reduce((acc, val) => acc + val, 0);
        console.info('Total duration', totalDuration);
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

    const handleUserInfoStartClick = React.useCallback((userName, userAvatar) => {
        setName(userName);
        setAvatar(userAvatar);
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
                    text: t('Oops! you clicked on {geoarea}', { geoarea: properties.title, _tags: 'gameplay' }),
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
    }, [
        gameState,
        mode,
        addAttempt,
        setMessage,
        answerRef,
        setClickedMapState,
        showCorrectAnswer,
        t,
    ]);

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
            <LanguagePicker className={styles.languagePicker} />
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
                    <T _str="Loading map..." />
                </div>
            )}
            <MessageView
                className={styles.message}
                message={message}
            />
            {mode && (roundRunning || gameState.current === 'initialize') && (
                <>
                    <Stats
                        avatar={avatar}
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
                    avatar={avatar}
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
                        tooltip={restartTooltip}
                        onClick={handleRestartRoundButtonClick}
                    >
                        <GrPowerReset />
                    </RoundButton>
                    <RoundButton
                        onClick={handleSurrenderButtonClick}
                        tooltip={endgameTooltip}
                    >
                        <IoMdClose />
                    </RoundButton>
                </div>
            )}
        </div>
    );
}

export default Home;
