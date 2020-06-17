const provinceTextPaint: mapboxgl.SymbolPaint = {
    'text-color': '#002121',
    'text-halo-color': 'rgba(255, 255, 255, 0.7)',
    'text-halo-width': 2,
};
const districtTextPaint: mapboxgl.SymbolPaint = {
    'text-color': '#002121',
    'text-halo-color': 'rgba(255, 255, 255, 0.7)',
    'text-halo-width': 2,
};
const provinceTextLayout: mapboxgl.SymbolLayout = {
    'text-field': ['get', 'title'],
    'text-size': 20,
    'text-justify': 'center',
    'text-anchor': 'center',
};
const districtTextLayout: mapboxgl.SymbolLayout = {
    'text-field': ['get', 'title'],
    'text-size': 20,
    'text-justify': 'center',
    'text-anchor': 'center',
};

const provinceFillPaint: mapboxgl.FillPaint = {
    'fill-color': [
        'case',
        ['==', ['feature-state', 'clicked'], 'good'],
        '#b9d993',
        ['==', ['feature-state', 'clicked'], 'bad'],
        '#da483d',
        ['==', ['feature-state', 'hint'], 'neutral'],
        '#223256',
        '#759bab',
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
        '#b9d993',
        ['==', ['feature-state', 'clicked'], 'bad'],
        '#da483d',
        ['==', ['feature-state', 'hint'], 'neutral'],
        '#223256',
        '#759bab',
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
