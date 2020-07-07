import React from 'react';

import { GameState } from '#types';

const orderedGameStateList: GameState[] = [
    'user-info',
    'mode-selection',
    'game-start',
    'initialize',
    'round-start',
    'round',
    'round-end',
    'game-end',
];

const ROUND_DELAY = 3000;

export default function useGameState(mapLoaded: boolean) {
    const [current, setCurrent] = React.useState<GameState>('user-info');
    const timeoutRef = React.useRef<number | undefined>();

    const navigateTo = React.useCallback((newState: GameState) => {
        setCurrent(newState);
    }, [setCurrent]);

    const next = React.useCallback(() => {
        const order = orderedGameStateList.findIndex((state) => state === current);

        if (order !== orderedGameStateList.length) {
            navigateTo(orderedGameStateList[order + 1]);
        }
    }, [navigateTo, current]);

    const prev = React.useCallback(() => {
        const order = orderedGameStateList.findIndex((state) => state === current);
        if (order !== 0) {
            navigateTo(orderedGameStateList[order - 1]);
        }
    }, [navigateTo, current]);

    React.useEffect(() => {
        if (!mapLoaded) {
            return;
        }

        if (current === 'game-start') {
            console.info('starting game...');
            next();
        }

        if (current === 'initialize') {
            console.info('initializing...');
            timeoutRef.current = window.setTimeout(() => {
                navigateTo('round-start');
            }, ROUND_DELAY);
        }

        if (current === 'round-start') {
            console.info('starting new round...');
            navigateTo('round');
        }

        if (current === 'round') {
            console.info('round-started');
        }

        if (current === 'round-end') {
            console.info('ending round in 3 sec...');

            timeoutRef.current = window.setTimeout(() => {
                navigateTo('round-start');
            }, ROUND_DELAY);
        }

        if (current === 'pre-game-end') {
            console.info('ending game in 3 sec...');
            window.clearTimeout(timeoutRef.current);

            timeoutRef.current = window.setTimeout(() => {
                navigateTo('game-end');
            }, ROUND_DELAY);
        }
    }, [current, navigateTo, mapLoaded, next]);

    const endCurrentRound = React.useCallback(() => {
        navigateTo('round-end');
    }, [navigateTo]);

    const startGame = React.useCallback(() => {
        window.clearTimeout(timeoutRef.current);
        navigateTo('game-start');
    }, [navigateTo]);

    const endGame = React.useCallback(() => {
        navigateTo('pre-game-end');
    }, [navigateTo]);

    return React.useMemo(() => ({
        current,
        next,
        prev,
        navigateTo,
        endCurrentRound,
        endGame,
        startGame,
    }), [current, next, prev, navigateTo, endCurrentRound, endGame, startGame]);
}
