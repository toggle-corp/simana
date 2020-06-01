import React from 'react';
import MapSource from '#re-map/MapSource';
import MapLayer from '#re-map/MapSource/MapLayer';

import { GameMode } from '#types';
import mapTheme from './mapTheme';

interface Props {
    mode: GameMode;
    onRegionClick: (p: mapboxgl.MapboxGeoJSONFeature['properties']) => void;
}

const noOp = () => { console.warn('entering/leaving'); };

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

    const handleProvinceClick = React.useCallback((e: mapboxgl.MapboxGeoJSONFeature) => {
        const { properties } = e;

        if (onRegionClick) {
            onRegionClick(properties);
        }

        return undefined;
    }, [onRegionClick]);

    const handleDistrictClick = React.useCallback((e: mapboxgl.MapboxGeoJSONFeature) => {
        const { properties } = e;

        if (onRegionClick) {
            onRegionClick(properties);
        }

        return undefined;
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
                                paint: mapTheme.province.fillPaint,
                            }}
                            onMouseEnter={noOp}
                            onMouseLeave={noOp}
                        />
                        <MapLayer
                            layerKey="province-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.province,
                                type: 'line',
                                paint: mapTheme.province.outlinePaint,
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
                                paint: mapTheme.province.fillPaint,
                            }}
                            onMouseEnter={noOp}
                            onMouseLeave={noOp}
                        />
                        <MapLayer
                            layerKey="district-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'line',
                                paint: mapTheme.province.outlinePaint,
                            }}
                        />
                    </>
                )}
            </MapSource>
        </>
    );
}

export default RegionMap;
