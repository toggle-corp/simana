import React from 'react';
import MapSource from '#re-map/MapSource';
import MapLayer from '#re-map/MapSource/MapLayer';

import { GameMode } from '#types';

interface Props {
    mode: GameMode;
    onRegionClick: (p: { code: string }) => void;
}

const mapSources = {
    nepal: {
        url: 'mapbox://togglecorp.2pw3lud3',
        layers: {
            province: 'provincegeo',
            district: 'districtgeo',
            municipality: 'municipalitygeo',
            ward: 'wardgeo',
        },
    },
    nepalCentroid: {
        url: 'mapbox://togglecorp.1j8vj54j',
        layers: {
            province: 'provincecentroidgeo',
            district: 'districtcentroidgeo',
            municipality: 'municipalitycentroidgeo',
            ward: 'wardcentroidgeo',
        },
    },
};

function RegionMap(props: Props) {
    const {
        mode,
        onRegionClick,
    } = props;

    const handleProvinceClick = React.useCallback((e) => {
        const { properties } = e;

        if (onRegionClick) {
            onRegionClick(properties);
        }
    }, [onRegionClick]);

    const handleDistrictClick = React.useCallback((e) => {
        const { properties } = e;

        if (onRegionClick) {
            onRegionClick(properties);
        }
    }, [onRegionClick]);

    return (
        <>
            <MapSource
                sourceKey="country"
                sourceOptions={{
                    type: 'vector',
                    url: mapSources.nepal.url,
                }}
            >
                { mode === 'province' && (
                    <>
                        <MapLayer
                            layerKey="province-fill"
                            onClick={handleProvinceClick}
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.province,
                                type: 'fill',
                                paint: {
                                    'fill-color': '#008088',
                                    'fill-opacity': 0.1,
                                },
                            }}
                        />
                        <MapLayer
                            layerKey="province-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.province,
                                type: 'line',
                            }}
                        />
                    </>
                )}
                { mode === 'district' && (
                    <>
                        <MapLayer
                            layerKey="district-fill"
                            onClick={handleDistrictClick}
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'fill',
                                paint: {
                                    'fill-color': '#008088',
                                    'fill-opacity': 0.1,
                                },
                            }}
                        />
                        <MapLayer
                            layerKey="district-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'line',
                            }}
                        />
                    </>
                )}
            </MapSource>
        </>
    );
}

export default RegionMap;
