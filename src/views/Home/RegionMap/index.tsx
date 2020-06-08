import React, { useMemo } from 'react';
import { unique } from '@togglecorp/fujs';

import MapSource from '#re-map/MapSource';
import State from '#re-map/MapSource/MapState';
import MapLayer from '#re-map/MapSource/MapLayer';


import {
    GameMode,
    MapState,
} from '#types';
import mapTheme from './mapTheme';

interface Props {
    mode: GameMode;
    onRegionClick: (p: mapboxgl.MapboxGeoJSONFeature['properties']) => void;
    clickedMapState?: MapState;
    hintMapState?: MapState;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

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
        clickedMapState,
        hintMapState,
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

    const clickedAttributes = React.useMemo(() => {
        if (!clickedMapState) {
            return [];
        }

        return [clickedMapState];
    }, [clickedMapState]);

    const hintAttributes = React.useMemo(() => {
        if (!hintMapState) {
            return [];
        }

        return [hintMapState];
    }, [hintMapState]);

    const filter: mapboxgl.Layer['filter'] | undefined = useMemo(
        () => {
            const ids: number[] = [-1];
            if (hintMapState) {
                ids.push(hintMapState.id);
            }
            if (clickedMapState) {
                ids.push(clickedMapState.id);
            }
            return ['match', ['id'], unique(ids), true, false];
        },
        [clickedMapState, hintMapState],
    );

    return (
        <>
            <MapSource
                sourceKey="country"
                sourceOptions={{
                    type: 'vector',
                    url: mapSources.nepal.url,
                }}
            >
                {(mode === 'province' || mode === 'provinceFixed') && (
                    <>
                        <MapLayer
                            layerKey="province-fill"
                            onClick={handleProvinceClick}
                            onMouseEnter={noOp}
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.province,
                                type: 'fill',
                                paint: mapTheme.province.fillPaint,
                            }}
                        />
                        <MapLayer
                            layerKey="province-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.province,
                                type: 'line',
                                paint: mapTheme.province.outlinePaint,
                            }}
                        />
                        <State
                            attributes={clickedAttributes}
                            attributeKey="clicked"
                            sourceLayer={mapSources.nepal.layers.province}
                        />
                        <State
                            attributes={hintAttributes}
                            attributeKey="hint"
                            sourceLayer={mapSources.nepal.layers.province}
                        />
                    </>
                )}
                {(mode === 'district' || mode === 'districtFixed') && (
                    <>
                        <MapLayer
                            layerKey="district-fill"
                            onClick={handleDistrictClick}
                            onMouseEnter={noOp}
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'fill',
                                paint: mapTheme.district.fillPaint,
                            }}
                        />
                        <MapLayer
                            layerKey="district-outline"
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'line',
                                paint: mapTheme.district.outlinePaint,
                            }}
                        />
                        <State
                            attributes={clickedAttributes}
                            attributeKey="clicked"
                            sourceLayer={mapSources.nepal.layers.district}
                        />
                        <State
                            attributes={hintAttributes}
                            attributeKey="hint"
                            sourceLayer={mapSources.nepal.layers.district}
                        />
                    </>
                )}
            </MapSource>
            <MapSource
                sourceKey="countryCentroids"
                sourceOptions={{
                    type: 'vector',
                    url: mapSources.nepalCentroid.url,
                }}
            >
                {(mode === 'province' || mode === 'provinceFixed') && (
                    <MapLayer
                        layerKey="province-label"
                        layerOptions={{
                            'source-layer': mapSources.nepalCentroid.layers.province,
                            type: 'symbol',
                            paint: mapTheme.province.textPaint,
                            layout: mapTheme.province.textLayout,
                            filter,
                        }}
                    />
                )}
                {(mode === 'district' || mode === 'districtFixed') && (
                    <MapLayer
                        layerKey="district-label"
                        layerOptions={{
                            'source-layer': mapSources.nepalCentroid.layers.district,
                            type: 'symbol',
                            paint: mapTheme.district.textPaint,
                            layout: mapTheme.district.textLayout,
                            filter,
                        }}
                    />
                )}
            </MapSource>
        </>
    );
}

export default RegionMap;
