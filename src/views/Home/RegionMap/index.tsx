import React from 'react';
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

    return (
        <>
            <MapSource
                sourceKey="country"
                sourceOptions={{
                    type: 'vector',
                    url: mapSources.nepal.url,
                }}
            >
                { (mode === 'province' || mode === 'provinceFixed') && (
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
                { (mode === 'district' || mode === 'districtFixed') && (
                    <>
                        <MapLayer
                            layerKey="district-fill"
                            onClick={handleDistrictClick}
                            layerOptions={{
                                'source-layer': mapSources.nepal.layers.district,
                                type: 'fill',
                                paint: mapTheme.district.fillPaint,
                            }}
                            onMouseEnter={noOp}
                            onMouseLeave={noOp}
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
        </>
    );
}

export default RegionMap;
