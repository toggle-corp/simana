import {
    GameMode,
    Challenge,
} from '#types';

import {
    ONE_MINUTE,
    ROUND_DURATION,
    TOTAL_PROVINCES,
    TOTAL_DISTRICTS,
    PROVINCE_MAX_ROUNDS,
    DISTRICTS_MAX_ROUNDS,
    positiveMessageList,
    MAX_ATTEMPTS,
    SCORE_UNIT,
} from '#utils/constants';

const modeToMaxRoundMap: {
    [key in GameMode]: number;
} = {
    province: TOTAL_PROVINCES,
    district: TOTAL_DISTRICTS,
    provinceFixed: PROVINCE_MAX_ROUNDS,
    districtFixed: DISTRICTS_MAX_ROUNDS,
};

const modeToMaxTotalDurationMap: {
    [key in GameMode]: number;
} = {
    province: 1 * ONE_MINUTE,
    district: 15 * ONE_MINUTE,
    provinceFixed: ROUND_DURATION * PROVINCE_MAX_ROUNDS,
    districtFixed: ROUND_DURATION * DISTRICTS_MAX_ROUNDS,
};

export function getMaxDuration(mode: GameMode) {
    return modeToMaxTotalDurationMap[mode];
}

export function getMaxRounds(mode: GameMode) {
    return modeToMaxRoundMap[mode];
}

export function shuffle(array: any[]) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export function getRandomPositiveMessage() {
    const randomIndex = Math.floor(Math.random() * positiveMessageList.length);
    return positiveMessageList[randomIndex];
}

export function calculateScore(challengeList: Challenge[]) {
    return challengeList.reduce((acc, val) => {
        if (val.result === 'pass') {
            return acc + (MAX_ATTEMPTS - val.attempts.length + 1) * SCORE_UNIT;
        }

        return acc;
    }, 0);
}
