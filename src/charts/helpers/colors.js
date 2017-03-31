define(function(require) {

    // Color Gradients
    const britechartGradients = {
            greenBlueGradient: ['#39C7EA', '#4CDCBA'],
            orangePinkGradient: ['#FBC670', '#F766B8'],
            bluePurpleGradient: ['#3DC3C9', '#824a9e']
        };

    // Color Schemas
    // Standard Color Schema for Britecharts
    const britechartsColorSchema = [
            '#6aedc7', //green
            '#39c2c9', //blue
            '#ffce00', //yellow
            '#ffa71a', //orange
            '#f866b9', //pink
            '#998ce3' //purple
        ];

    // Grey Schema for Britecharts
    const britechartsGreySchema = [
            '#F8F8FA',
            '#EFF2F5',
            '#D2D6DF',
            '#C3C6CF',
            '#ADB0B6',
            '#666A73',
            '#45494E',
            '#363A43',
            '#282C35'
        ];

    // Extended Orange Palette
    const extendedOrangeColorSchema = [
            '#fcc870',
            '#ffa71a',
            '#fb8825',
            '#f6682f',
            '#db5a2c',
            '#bf4c28',
            '#a43b1c',
            '#892a10',
            '#f9e9c5'
        ];
    // Extended Blue Palette
    const extendedBlueColorSchema = [
            '#ccf7f6',
            '#70e4e0',
            '#00d8d2',
            '#00acaf',
            '#007f8c',
            '#005e66',
            '#003c3f',
            '#002d2f',
            '#0d2223'
        ];
    // Extended LightBlue Palette
    const extendedLightBlueColorSchema = [
            '#ccfffe',
            '#94f7f4',
            '#00fff8',
            '#1de1e1',
            '#39c2c9',
            '#2e9a9d',
            '#227270',
            '#1a5957',
            '#133f3e'
        ];
    // Extended Green Palette
    const extendedGreenColorSchema = [
            '#edfff7',
            '#d7ffef',
            '#c0ffe7',
            '#95f5d7',
            '#6aedc7',
            '#59c3a3',
            '#479980',
            '#34816a',
            '#206953'
        ];
    // Extended Yellow Palette
    const extendedYellowColorSchema = [
            '#f9f2b3',
            '#fbe986',
            '#fce05a',
            '#fed72d',
            '#ffce00',
            '#fcc11c',
            '#f9b438',
            '#eda629',
            '#e09819'
        ];
    // Extended Pink Palette
    const extendedPinkColorSchema = [
            '#fdd1ea',
            '#fb9cd2',
            '#f866b9',
            '#fc40b6',
            '#ff1ab3',
            '#e3239d',
            '#c62c86',
            '#a62073',
            '#85135f'
        ];
    // Extended Purple Palette
    const extendedPurpleColorSchema = [
            '#ddd6fc',
            '#bbb1f0',
            '#998ce3',
            '#8e6bc1',
            '#824a9e',
            '#77337f',
            '#6b1c60',
            '#591650',
            '#470f3f'
        ];
    // Extended Red Palette
    const extendedRedColorSchema = [
            '#ffd8d4',
            '#ffb5b0',
            '#ff938c',
            '#ff766c',
            '#ff584c',
            '#f04b42',
            '#e03d38',
            '#be2e29',
            '#9c1e19'
        ];

    const aloeGreen = [
            '#7bdcc0'
        ];

    return {
        colorSchemas: {
            britechartsColorSchema,
            britechartsGreySchema,
            extendedOrangeColorSchema,
            extendedBlueColorSchema,
            extendedLightBlueColorSchema,
            extendedGreenColorSchema,
            extendedYellowColorSchema,
            extendedPinkColorSchema,
            extendedPurpleColorSchema,
            extendedRedColorSchema
        },
        colorSchemasHuman: {
            'britechartsColorSchema': 'Britecharts Default',
            'britechartsGreySchema': 'Britecharts Grey',
            'extendedOrangeColorSchema': 'Orange',
            'extendedBlueColorSchema': 'Blue',
            'extendedLightBlueColorSchema': 'Light Blue',
            'extendedGreenColorSchema': 'Green',
            'extendedYellowColorSchema': 'Yellow',
            'extendedPinkColorSchema': 'Pink',
            'extendedPurpleColorSchema': 'Purple',
            'extendedRedColorSchema': 'Red'
        },
        singleColors: {
            aloeGreen
        },
        colorGradients: britechartGradients,
        colorGradientsHuman: {
            greenBlueGradient: 'Green To Blue',
            orangePinkGradient: 'Orange to Pink',
            bluePurpleGradient: 'Blue to Purple'
        }
    };
});
