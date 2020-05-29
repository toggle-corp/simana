import React from 'react';

const DEFAULT_TICK_INTERVAL = 200;

export function useTimer(use: boolean, tickInterval:number = DEFAULT_TICK_INTERVAL) {
    const [tick, setTick] = React.useState(0);
    const [initialTime, setInitialTime] = React.useState(new Date().getTime());
    const [elapsed, setElapsed] = React.useState(0);
    const shouldTick = React.useRef(use);

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
            setTick((prevTick) => prevTick + 1);
            setElapsed(currentElapsed);
        }
    }, [initialTime, setTick, setElapsed, shouldTick]);

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

    return [tick, elapsed];
}

const ROUND_DURATION = 2000;
const MAX_ROUNDS = 10;

export function useGameplay(
    gameId: string,
    gameState: string,
    onGameplayEnd: () => void,
) {
    const [tick, elapsed] = useTimer(gameState === 'play');
    const [round, setRound] = React.useState(1);

    if (gameState === 'play') {
        const currentRound = 1 + Math.floor(elapsed / ROUND_DURATION);

        if (currentRound > MAX_ROUNDS) {
            onGameplayEnd();
        } else if (currentRound !== round) {
            setRound(currentRound);
        }
    }

    return {
        tick,
        elapsed,
        round,
    };
}
