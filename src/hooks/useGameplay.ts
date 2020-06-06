import React from 'react';
import {
    districts,
    provinces,
    ROUND_DURATION,
    MAX_ATTEMPTS,
} from '#utils/constants';

import {
    shuffle,
    getMaxRounds,
    getMaxDuration,
} from '#utils/common';

import {
    Challenge,
    GameMode,
    GameState,
    Region,
} from '#types';

const DEFAULT_TICK_INTERVAL = 500;

const regionMap: {
    [key in GameMode]: Region[];
} = {
    district: districts,
    province: provinces,
    provinceFixed: provinces,
    districtFixed: districts,
};

const getRegions = (mode: GameMode, amount: number) => {
    const shuffledRegions = shuffle(regionMap[mode])
        .slice(0, amount)
        .map((r) => ({
            code: r.code,
            title: r.title,
        }));

    return shuffledRegions;
};

export function useTimer(
    use: boolean,
    gameId: number | string,
    tickInterval:number = DEFAULT_TICK_INTERVAL,
) {
    const [tick, setTick] = React.useState(0);
    const initialTimeRef = React.useRef(new Date().getTime());
    const [initialTime, setInitialTime] = React.useState(initialTimeRef.current);
    const [initialLapTime, setInitialLapTime] = React.useState(initialTimeRef.current);
    const [elapsed, setElapsed] = React.useState(0);
    const [lapElapsed, setLapElapsed] = React.useState(0);
    const shouldTick = React.useRef(use);

    const addLap = React.useCallback(() => {
        setInitialLapTime(new Date().getTime());
        setLapElapsed(0);
    }, [setInitialLapTime, setLapElapsed]);

    React.useEffect(() => {
        shouldTick.current = use;
        if (use) {
            setInitialTime(new Date().getTime());
        }
    }, [use, gameId, shouldTick, setInitialTime]);

    const handleTick = React.useCallback(() => {
        const { current } = shouldTick;

        if (current) {
            const now = new Date().getTime();
            const currentElapsed = now - initialTime;
            const currentLapElapsed = now - initialLapTime;
            setTick((prevTick) => prevTick + 1);
            setElapsed(currentElapsed);
            setLapElapsed(currentLapElapsed);
        }
    }, [initialTime, initialLapTime, setTick, setElapsed, setLapElapsed, shouldTick]);

    const cleanUp = React.useCallback((interval) => {
        window.clearInterval(interval);
        if (!shouldTick.current) {
            setElapsed(0);
        }
    }, [setElapsed, shouldTick]);

    React.useEffect(() => {
        let interval:number | undefined;

        if (use) {
            interval = window.setInterval(handleTick, tickInterval);
        } else {
            cleanUp(interval);
        }

        return (): void => { cleanUp(interval); };
    }, [tickInterval, handleTick, use, cleanUp]);

    return {
        tick,
        elapsed,
        addLap,
        lapElapsed,
    };
}

export function useGameplay(
    gameId: string | number,
    gameState: GameState,
    gameMode: GameMode | undefined,
    onGameplayEnd: () => void,
) {
    const {
        tick,
        elapsed,
        addLap,
        lapElapsed,
    } = useTimer(gameState === 'play', gameId);
    const [round, setRound] = React.useState(0);
    const [challenges, setChallenges] = React.useState<Challenge[]>([]);


    React.useEffect(() => {
        if (gameMode && gameState === 'initialize') {
            const maxRounds = getMaxRounds(gameMode);
            const regions = getRegions(gameMode, maxRounds);
            const newChallenges = regions.map((region) => ({
                title: `Find ${region.title}`,
                answer: region.code,
                result: undefined,
                attempts: [],
            }));
            setChallenges(newChallenges);
            console.info('initializing......');
        }
    }, [gameState, setChallenges, gameId, gameMode, setRound, addLap]);

    React.useEffect(() => {
        console.info('game state changed', gameState);
        if (gameMode && gameState === 'play') {
            setRound(0);
            addLap();
            console.info('setting round......');
        }
    }, [gameId, gameMode, gameState, setRound, addLap]);

    const addAttempt = React.useCallback((answer) => {
        const currentChallenge = challenges[round];
        const updatedChallenge = { ...currentChallenge };
        updatedChallenge.attempts = [...currentChallenge.attempts, answer];

        if (currentChallenge?.answer === answer) {
            updatedChallenge.result = 'pass';
        } else if (updatedChallenge.attempts.length >= MAX_ATTEMPTS) {
            updatedChallenge.result = 'fail';
        }

        const newChallenges = [...challenges];
        newChallenges.splice(round, 1, updatedChallenge);
        setChallenges(newChallenges);

        return updatedChallenge.result;
    }, [challenges, round, setChallenges]);

    if (gameMode && gameState === 'play') {
        let currentRound = round;
        const currentChallenge = challenges[round];

        if (currentChallenge?.result) {
            currentRound += 1;
            addLap();
        }

        switch (gameMode) {
            case 'provinceFixed':
            case 'districtFixed':
                if (lapElapsed >= ROUND_DURATION) {
                    currentRound += 1;
                    addLap();
                }
                break;

            case 'province':
            case 'district':
            default:
                break;
        }

        const maxRounds = getMaxRounds(gameMode);
        const gameEnded = currentRound >= maxRounds || elapsed >= getMaxDuration(gameMode);
        if (gameEnded) {
            setRound(0);
            onGameplayEnd();
        } else if (currentRound !== round) {
            setRound(currentRound);
        }
    }

    return {
        tick,
        elapsed,
        round,
        challenges,
        addAttempt,
        lapElapsed,
    };
}
