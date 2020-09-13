import { listToMap } from '@togglecorp/fujs';

import { AvatarKey } from '#types';

import avatar1 from '../assets/Avatar-02.svg';
import avatar2 from '../assets/Avatar-03.svg';
import avatar3 from '../assets/Avatar-04.svg';
import avatar4 from '../assets/Avatar-05.svg';

import rawDistricts from './districts.json';
import rawProvinces from './provinces.json';

export const appName = 'Simana';

export const gameModes = {
    province: 'Province all',
    district: 'District all',
    provinceFixed: 'Province quick',
    districtFixed: 'District quick',
};

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;

export const ROUND_DURATION = 15 * ONE_SECOND;
export const MAX_ATTEMPTS = 3;

export const TOTAL_PROVINCES = 7;
export const TOTAL_DISTRICTS = 77;
export const PROVINCE_MAX_ROUNDS = 5;
export const DISTRICTS_MAX_ROUNDS = 10;

export const SCORE_UNIT = 500;

export const DEFAULT_TICK_INTERVAL = 500;


export const positiveMessageList = [
    'Amazing!',
    'Awesome!',
    'Brilliant!',
    'Dazzling!',
    'Delightful!',
    'Fabulous!',
    'Fantastic!',
    'Good job!',
    'Great!',
    'Impressive!',
    'Perfect!',
    'Remarkable!',
    'Terrific!',
    'Wonderful!',
];


export const provinces = rawProvinces.map((p) => ({
    ...p,
    id: +p.id,
}));

export const provinceIdByCode = listToMap(provinces, (d) => d.code, (d) => d.id);

export const districts = rawDistricts.map((d) => ({
    ...d,
    id: +d.id,
}));

export const districtIdByCode = listToMap(districts, (d) => d.code, (d) => d.id);

export const avatars: {
    [key in AvatarKey]: string;
} = {
    avatar1,
    avatar2,
    avatar3,
    avatar4,
};
