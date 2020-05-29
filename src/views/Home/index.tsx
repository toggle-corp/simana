import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Map from '#remap';
import MapContainer from '#remap/MapContainer';

import { BBox } from '#types';

import styles from './styles.css';

interface Props {
    className?: string;
}

const lightStyle = 'mapbox://styles/mapbox/light-v10';
const mapSources = {
    nepal: {
        url: 'mapbox://neocmoha.9sgqk05q',
        layers: {
            province: 'provincegeo',
            district: 'districtgeo',
            municipality: 'municipalitygeo',
            ward: 'wardgeo',
        },
    },
    nepalCentroid: {
        url: 'mapbox://neocmoha.21in8y6a',
        layers: {
            province: 'provincecentroidgeo',
            district: 'districtcentroidgeo',
            municipality: 'municipalitycentroidgeo',
            ward: 'wardcentroidgeo',
        },
    },
};
const defaultBounds: BBox = [
    80.05858661752784,
    26.347836996368667,
    88.20166918432409,
    30.44702867091792,
];

const Home = (props: Props) => {
    const { className } = props;

    return (
        <div className={_cs(className, styles.home)}>
            <Map
                mapStyle={lightStyle}
                mapOptions={{
                    logoPosition: 'bottom-left',
                    minZoom: 5,
                    bounds: defaultBounds,
                }}
                scaleControlShown
                navControlShown
                scaleControlPosition="bottom-right"
                navControlPosition="top-right"
            >
                <MapContainer className={styles.mapContainer} />
            </Map>
        </div>
    );
};

export default Home;
