export declare enum ColorSchema {
    britecharts = 0,
    grey = 1,
    orange = 2,
    blueGreen = 3,
    teal = 4,
    green = 5,
    yellow = 6,
    pink = 7,
    purple = 8,
    red = 9,
}

export type ColorsSchemaHumanType = {
    [key in keyof typeof ColorSchema]: string;
};

export type ColorsSchemasType = string[];
export type ColorGradientType = [string, string];

export type ColorSchemas = {
    [key in keyof typeof ColorSchema]: ColorsSchemasType;
};

export declare enum ColorGradient {
    greenBlue = 0,
    orangePink = 1,
    bluePurple = 2,
}

export type ColorGradients = {
    [key in keyof typeof ColorGradient]: ColorGradientType;
};

export type ColorGradientsHuman = {
    [key in keyof typeof ColorGradient]: string;
};

export declare enum SingleColor {
    aloeGreen = 0,
    greenColor = 1,
    blueColor = 2,
    yellowColor = 3,
    orangeColor = 4,
    pinkColor = 5,
    purpleColor = 6,
}

export type SingleColors = {
    [key in keyof typeof SingleColor]: ColorsSchemasType;
};

export type SingleColorsHuman = {
    [key in keyof typeof SingleColor]: string;
};

// No `colors` value is declared here. The real one is
// `charts/helpers/color.ts`'s default export, which `src/index.ts` exports as
// `colors`, and its generated declaration says what it is. The six types above
// are what `color.ts` annotates itself with, so they are the shared vocabulary
// rather than a parallel description of it.
