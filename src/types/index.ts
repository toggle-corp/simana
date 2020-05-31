export type Point = [number, number];
export type BBox = [number, number, number, number];

export type GameState = 'user-info' | 'mode-selection' | 'initialize' | 'play' | 'finished';
export type GameMode = 'province' | 'district';

export interface Challange {
    title: string;
    answer: string;
    result: 'pass' | 'fail' | undefined;
    attempts: string[];
}

export interface Region {
    code: string;
    title: string;
}
