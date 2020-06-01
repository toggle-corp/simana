import React from 'react';
import {
    districts,
    provinces,
} from '#utils/constants';

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
};

const getRandomRegions = (mode: GameMode, amount: number) => {
    const regions = regionMap[mode];
    const randomRegions = [...Array(amount).keys()].map(() => {
        const randomIndex = Math.floor(Math.random() * Math.floor(regions.length));
        const region = regions[randomIndex];

        return {
            code: region.code,
            title: region.title,
        };
    });

    return randomRegions;
};

export function useTimer(
    use: boolean,
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
    }, [use, shouldTick, setInitialTime]);

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
    }, []);

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

const ROUND_DURATION = 10000;
const MAX_ROUNDS = 10;

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
    } = useTimer(gameState === 'play');
    const [round, setRound] = React.useState(0);
    const [challenges, setChallenges] = React.useState<Challenge[]>([]);


    React.useEffect(() => {
        if (gameMode && gameState === 'initialize') {
            const randomRegions = getRandomRegions(gameMode, MAX_ROUNDS);
            const newChallenges = randomRegions.map((region) => ({
                title: `Find ${region.title}`,
                answer: region.code,
                result: undefined,
                attempts: [],
            }));
            setChallenges(newChallenges);
        }

        if (gameMode && gameState === 'play') {
            setRound(0);
            addLap();
            console.info('setting round......');
        }
    }, [gameState, setChallenges, gameId, gameMode, setRound, addLap]);

    const addAttempt = React.useCallback((answer) => {
        const currentChallenge = challenges[round];
        const updatedChallenge = { ...currentChallenge };
        updatedChallenge.attempts = [...currentChallenge.attempts, answer];

        if (currentChallenge?.answer === answer) {
            updatedChallenge.result = 'pass';
            // console.warn('correct answer');
        } else {
            updatedChallenge.result = 'fail';
            // console.warn('An attempt was made', answer);
        }

        const newChallenges = [...challenges];
        newChallenges.splice(round, 1, updatedChallenge);
        setChallenges(newChallenges);
    }, [challenges, round, setChallenges]);

    if (gameState === 'play') {
        let currentRound = round;
        console.info('current round', round);
        const currentChallenge = challenges[round];

        if (currentChallenge?.result) {
            currentRound += 1;
            addLap();
        }

        if (lapElapsed >= ROUND_DURATION) {
            currentRound += 1;
            addLap();
        }

        if (currentRound >= MAX_ROUNDS) {
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
    };
}
