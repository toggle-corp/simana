const provinceFillPaint: mapboxgl.FillPaint = {
    'fill-color': '#dbe3be',
    'fill-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        1,
        0.3,
    ],
};

const districtFillPaint : mapboxgl.FillPaint = {
    'fill-color': '#dbe3be',
    'fill-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        1,
        0.3,
    ],
};

const provinceOutlinePaint: mapboxgl.LinePaint = {
    'line-color': '#006e90',
    'line-width': 2,
    'line-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        0.9,
        0.7,
    ],
};

const districtOutlinePaint: mapboxgl.LinePaint = {
    'line-color': '#006e90',
    'line-width': 1.2,
    'line-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        0.9,
        0.7,
    ],
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
