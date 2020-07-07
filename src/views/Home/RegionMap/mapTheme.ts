const provinceTextPaint: mapboxgl.SymbolPaint = {
    'text-color': '#000000',
    'text-halo-color': '#fffff0',
    'text-halo-width': 1,
};
const districtTextPaint: mapboxgl.SymbolPaint = {
    'text-color': '#000000',
    'text-halo-color': '#fffff0',
    'text-halo-width': 1,
};
const provinceTextLayout: mapboxgl.SymbolLayout = {
    'text-field': ['get', 'title'],
    'text-size': 18,
    'text-justify': 'center',
    'text-anchor': 'center',
};
const districtTextLayout: mapboxgl.SymbolLayout = {
    'text-field': ['get', 'title'],
    'text-size': 13,
    'text-justify': 'center',
    'text-anchor': 'center',
};

const colorGood = '#b9d993';
const colorBad = '#ff988d';
const colorNeutral = '#4282c6';
const colorDefault = '#759bab';

const provinceFillPaint: mapboxgl.FillPaint = {
    'fill-color': [
        'case',
        ['==', ['feature-state', 'clicked'], 'good'],
        colorGood,
        ['==', ['feature-state', 'clicked'], 'bad'],
        colorBad,
        ['==', ['feature-state', 'hint'], 'neutral'],
        colorNeutral,
        colorDefault,
    ],
    'fill-opacity': [
        'case',
        ['==', ['feature-state', 'hovered'], true],
        1,
        0.7,
    ],
};

const districtFillPaint : mapboxgl.FillPaint = {
    'fill-color': [
        'case',
        ['==', ['feature-state', 'clicked'], 'good'],
        colorGood,
        ['==', ['feature-state', 'clicked'], 'bad'],
        colorBad,
        ['==', ['feature-state', 'hint'], 'neutral'],
        colorNeutral,
        colorDefault,
    ],
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
        textPaint: provinceTextPaint,
        textLayout: provinceTextLayout,
    },
    district: {
        outlinePaint: districtOutlinePaint,
        fillPaint: districtFillPaint,
        textPaint: districtTextPaint,
        textLayout: districtTextLayout,
    },
};

export default mapTheme;
