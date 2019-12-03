define(function() {

    // Color Gradients
    const colorGradients = {
        greenBlue: ['#39C7EA', '#4CDCBA'],
        orangePink: ['#FBC670', '#F766B8'],
        bluePurple: ['#3DC3C9', '#824a9e']
    };
    const colorGradientsHuman = {
        greenBlue: 'Green to Blue',
        orangePink: 'Orange to Pink',
        bluePurple: 'Blue to Purple'
    };

    // Color Schemas
    // Standard Color Schema for Britecharts
    const britecharts = [
            '#6aedc7', //green
            '#39c2c9', //blue
            '#ffce00', //yellow
            '#ffa71a', //orange
            '#f866b9', //pink
            '#998ce3' //purple
        ];
    // Grey Palette
    const grey = [
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
    // Orange Palette
    const orange = [
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
    // Blue Palette
    const blueGreen = [
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
    // LightBlue Palette
    const teal = [
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
    // Green Palette
    const green = [
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
    // Yellow Palette
    const yellow = [
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
    // Pink Palette
    const pink = [
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
    // Purple Palette
    const purple = [
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
    // Red Palette
    const red = [
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

    const colorSchemas = {
        britecharts,
        grey,
        orange,
        blueGreen,
        teal,
        green,
        yellow,
        pink,
        purple,
        red
    };
    const colorSchemasHuman = {
        'britecharts': 'Britecharts Default',
        'grey': 'Britecharts Grey',
        'orange': 'Orange',
        'blueGreen': 'Blue',
        'teal': 'Light Blue',
        'green': 'Green',
        'yellow': 'Yellow',
        'pink': 'Pink',
        'purple': 'Purple',
        'red': 'Red'
    };

    // Single Colors
    const aloeGreen = ['#7bdcc0']; // To Deprecate
    const greenColor = ['#6aedc7'];
    const blueColor = ['#39c2c9'];
    const yellowColor = ['#ffce00'];
    const orangeColor = ['#ffa71a'];
    const pinkColor = ['#f866b9'];
    const purpleColor = ['#998ce3'];

    const singleColors = {
        aloeGreen,
        greenColor,
        blueColor,
        yellowColor,
        orangeColor,
        pinkColor,
        purpleColor,
    };
    const singleColorsHuman = {
        aloeGreen: 'Aloe Green',
        greenColor: 'Green',
        blueColor: 'Blue',
        yellowColor: 'Yellow',
        orangeColor: 'Orange',
        pinkColor: 'Pink',
        purpleColor: 'Purple',
    };

    return {
        colorSchemas,
        colorSchemasHuman,
        colorGradients,
        colorGradientsHuman,
        singleColors,
        singleColorsHuman,
    };
});
