const provinceFillPaint: mapboxgl.FillPaint = {
    'fill-color': '#759bab',
    'fill-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        1,
        0.8,
    ],
};

const districtFillPaint : mapboxgl.FillPaint = {
    'fill-color': '#759bab',
    'fill-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        1,
        0.8,
    ],
};

const provinceOutlinePaint: mapboxgl.LinePaint = {
    'line-color': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        '#ffffff',
        '#fffff0',
    ],
    'line-width': 1,
    'line-opacity': 1,
};

const districtOutlinePaint: mapboxgl.LinePaint = {
    'line-color': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        '#ffffff',
        '#fffff0',
    ],
    'line-width': 1,
    'line-opacity': 1,
};

const mapTheme = {
    province: {
        outlinePaint: provinceOutlinePaint,
        fillPaint: provinceFillPaint,
    },
    district: {
        outlinePaint: districtOutlinePaint,
        fillPaint: districtFillPaint,
    },
};

export default mapTheme;
