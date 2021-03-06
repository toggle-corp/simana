import { lazy } from 'react';

export interface Route {
    path: string;
    name: string;
    title: string;
    load: React.ExoticComponent<{ className?: string }>;

    hideNavbar?: boolean;
}

export interface FallbackRoute {
    default: false;
    path: undefined;
    name: string;
    title: string;
    load: React.ExoticComponent<{ className?: string }>;

    hideNavbar?: boolean;
}

export type SomeRoute = Route | FallbackRoute;

const routeSettings: SomeRoute[] = [
    {
        path: '/',
        name: 'home',
        title: 'Home',
        load: lazy(() => import('../../../views/Home')),
        hideNavbar: true,
    },
    {
        path: '/403/',
        name: 'fourHundredThree',
        title: '403',
        load: lazy(() => import('../../../views/FourHundredThree')),
        hideNavbar: true,
    },
    {
        path: undefined,
        name: 'fourHundredFour',
        title: '404',
        load: lazy(() => import('../../../views/FourHundredFour')),
        default: false,
        hideNavbar: true,
    },
];

export default routeSettings;
