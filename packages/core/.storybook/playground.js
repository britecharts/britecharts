import colors from '../src/charts/helpers/color';

// The multi-colour schemas and the single colours, as one select: some charts
// default to a single colour (the bar chart's is `aloeGreen`).
const palettes = { ...colors.colorSchemas, ...colors.singleColors };
const paletteNames = Object.keys(palettes);

/**
 * The Playground story's args: each listed accessor's default, read from a
 * fresh chart's getter, so the Controls start where the chart does rather
 * than at values copied into the story. `colorSchema` is read back as the
 * name of its palette, since the Control is a select over the names.
 */
export const playgroundArgs = (createChart, accessors) => {
    const chart = createChart();

    return Object.fromEntries(
        accessors.flatMap((name) => {
            const value = chart[name]();

            if (name === 'colorSchema') {
                const paletteName = paletteNames.find(
                    (key) => palettes[key].join() === value.join()
                );

                // A default that is no named palette stays the chart's own.
                return paletteName ? [[name, paletteName]] : [];
            }

            return [[name, value]];
        })
    );
};

// Accessors whose empty default would otherwise get a text Control.
const numberArgs = /(^ticks|Ticks|Id|Offset|Padding)$/;

/**
 * The Playground's argTypes. Storybook infers a Control from an arg's value,
 * so an accessor with no default (`null` or `undefined`) would get none: those
 * get a number Control for counts, ids and offsets, and a text one otherwise.
 * `colorSchema` is a select over the palettes, and `grid` over its three
 * values.
 */
export const playgroundArgTypes = (args) =>
    Object.fromEntries(
        Object.entries(args).flatMap(([name, value]) => {
            if (name === 'colorSchema') {
                return [
                    [
                        name,
                        {
                            control: 'select',
                            options: paletteNames,
                            mapping: palettes,
                        },
                    ],
                ];
            }

            if (name === 'grid') {
                return [
                    [
                        name,
                        {
                            control: 'select',
                            options: ['horizontal', 'vertical', 'full'],
                        },
                    ],
                ];
            }

            if (value === null || value === undefined) {
                return [
                    [
                        name,
                        { control: numberArgs.test(name) ? 'number' : 'text' },
                    ],
                ];
            }

            return [];
        })
    );

/**
 * Sets every arg on the chart through its accessor. `null`, `undefined` and
 * `''` are left out, so a Control that is empty or has been cleared leaves the
 * chart's default in place rather than setting it to nothing.
 */
export const applyArgs = (chart, args) => {
    Object.entries(args).forEach(([name, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            chart[name](value);
        }
    });

    return chart;
};
