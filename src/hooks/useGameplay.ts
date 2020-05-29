import React from 'react';
import {
    districts,
    provinces,
} from '#utils/constants';

const DEFAULT_TICK_INTERVAL = 200;

const regionMap = {
    district: districts,
    province: provinces,
};

const getRandomRegions = (level, amount) => {
    const regions = regionMap[level];
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

export function useTimer(use: boolean, tickInterval:number = DEFAULT_TICK_INTERVAL) {
    const [tick, setTick] = React.useState(0);
    const initialTimeRef = React.useRef(new Date().getTime());
    const [initialTime, setInitialTime] = React.useState(initialTimeRef.current);
    const [lapTime, setLapTime] = React.useState(initialTimeRef.current);
    const [elapsed, setElapsed] = React.useState(0);
    const [lapElapsed, setLapElapsed] = React.useState(0);
    const shouldTick = React.useRef(use);

    const addLap = React.useCallback(() => {
        setLapTime(new Date().getTime());
        setLapElapsed(0);
    }, [setLapTime, setLapElapsed]);

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
            const currentLapElapsed = now - lapTime;
            setTick((prevTick) => prevTick + 1);
            setElapsed(currentElapsed);
            setLapElapsed(currentLapElapsed);
        }
    }, [initialTime, lapTime, setTick, setElapsed, setLapElapsed, shouldTick]);

    const cleanUp = React.useCallback((interval) => {
        window.clearInterval(interval);
        setTick(0);
        setElapsed(0);
    }, [setTick, setElapsed]);

    React.useEffect(() => {
        let interval;

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

const ROUND_DURATION = 5000;
const MAX_ROUNDS = 10;

interface Challange {
    title: string;
    answer: string;
    result: 'pass' | 'fail' | undefined;
    attempts: string[];
}

export function useGameplay(
    gameId: string,
    gameState: string,
    gameMode: string,
    onGameplayEnd: () => void,
) {
    const {
        tick,
        elapsed,
        addLap,
        lapElapsed,
    } = useTimer(gameState === 'play');
    const [round, setRound] = React.useState(0);
    const [challanges, setChallanges] = React.useState<Challange[]>([]);

    React.useEffect(() => {
        if (gameMode && gameState === 'play') {
            const randomRegions = getRandomRegions(gameMode, MAX_ROUNDS);
            const newChallanges = randomRegions.map((region) => ({
                title: `Find ${region.title}`,
                answer: region.code,
                result: undefined,
                attempts: [],
            }));

            setChallanges(newChallanges);
            setRound(0);
        }
    }, [gameState, setChallanges, gameId, gameMode, setRound]);

    const addAttempt = React.useCallback((answer) => {
        const currentChallange = challanges[round];
        const updatedChallange = { ...currentChallange };
        updatedChallange.attempts = [...currentChallange.attempts, answer];

        if (currentChallange?.answer === answer) {
            updatedChallange.result = 'pass';
            console.warn('correct answer');
        } else {
            updatedChallange.result = 'fail';
            console.warn('An attempt was made', answer);
        }

        const newChallanges = [...challanges];
        newChallanges.splice(round, 1, updatedChallange);
        setChallanges(newChallanges);
    }, [challanges, round, setChallanges]);

    if (gameState === 'play') {
        let currentRound = round;
        const currentChallange = challanges[round];

        if (currentChallange?.result) {
            currentRound += 1;
            addLap();
        }

        if (lapElapsed >= ROUND_DURATION) {
            currentRound += 1;
            addLap();
        }

        if (currentRound >= MAX_ROUNDS) {
            onGameplayEnd();
        } else if (currentRound !== round) {
            setRound(currentRound);
        }
    }

    return {
        tick,
        elapsed,
        round,
        challanges,
        addAttempt,
    };
}
