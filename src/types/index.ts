export type Point = [number, number];
export type BBox = [number, number, number, number];

export type GameState = 'user-info' | 'mode-selection' | 'initialize' | 'play' | 'finished';
export type GameMode = 'province' | 'district' | 'provinceFixed' | 'districtFixed';

export interface Challenge {
    title: string;
    answer: string;
    result: 'pass' | 'fail' | undefined;
    attempts: string[];
}

export interface Region {
    code: string;
    title: string;
}

export interface Message {
    text: string;
    timestamp: number;
    type?: 'good' | 'bad';
}
