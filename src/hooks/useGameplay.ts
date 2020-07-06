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
    getRoundDuration,
} from '#utils/common';

import {
    Challenge,
    GameMode,
    GameState,
    Region,
} from '#types';

import useTimer from './useTimer';


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

const fixedGameModeMap: {
    [key in GameMode]: boolean;
} = {
    province: false,
    district: false,
    provinceFixed: true,
    districtFixed: true,
};

export default function useGameplay(
    gameState: GameState,
    gameMode: GameMode | undefined,
    onRoundStart: (timestamp: number) => void,
    onRoundEnd: (round: number) => void,
    onGameplayEnd: (ticks: number[]) => void,
) {
    const isRoundRunning = gameState === 'round' || gameState === 'round-start' || gameState === 'round-end';
    const roundDuration = gameMode ? getRoundDuration(gameMode) : ROUND_DURATION;

    const {
        ticks,
        forceTick,
    } = useTimer(isRoundRunning, roundDuration);

    const [challenges, setChallenges] = React.useState<Challenge[]>([]);
    const [round, setRound] = React.useState<number>(0);

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
        }
    }, [gameState, setChallenges, gameMode]);

    React.useEffect(() => {
        if (gameState === 'round') {
            const timestamp = forceTick();
            onRoundStart(timestamp);
        }
    }, [gameState, forceTick, onRoundStart]);

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

    React.useEffect(() => {
        if (!gameMode || !isRoundRunning) {
            return;
        }

        let shouldUpdateRound = false;

        if (fixedGameModeMap[gameMode]) {
            if (ticks.length > round) {
                shouldUpdateRound = true;
            }
        }

        const currentChallenge = challenges[round];
        if (currentChallenge?.result) {
            shouldUpdateRound = true;
            forceTick(false);
        }

        if (shouldUpdateRound) {
            const newRound = round + 1;
            const maxRounds = getMaxRounds(gameMode);

            if (newRound >= maxRounds) {
                setRound(0);
                onGameplayEnd(ticks);
            } else {
                setRound(newRound);
                onRoundEnd(newRound);
            }
        }
    }, [
        challenges,
        ticks,
        round,
        gameMode,
        setRound,
        onRoundEnd,
        forceTick,
        onGameplayEnd,
        isRoundRunning,
    ]);

    return React.useMemo(() => ({
        ticks,
        round,
        challenges,
        addAttempt,
    }), [ticks, round, challenges, addAttempt]);
}
