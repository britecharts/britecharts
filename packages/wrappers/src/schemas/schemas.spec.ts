import * as core from '@britecharts/core';

import { britechartsCustomEvents, notConfigurationMethods } from '../constants';
import { buildSchemas, CHARTS } from '../../scripts/generate-schemas.mjs';

// The generated files are committed, so the chart types and the schemas can
// only drift apart if someone forgets to regenerate: these fail when they have.
const schemas = buildSchemas();
const committed = await Promise.all(
    CHARTS.map(async ([chart]) => {
        const name = chart as string;

        return {
            name,
            spec: (await import(`../../schemas/${name}.json`)).default,
            config: (await import(`./${name}.ts`)).default,
        };
    })
);

describe('chart schemas', () => {
    describe.each(committed)('$name', ({ name, spec, config }) => {
        it('should match what scripts/generate-schemas.mjs writes from the types (run `pnpm run schemas`)', () => {
            expect(spec).toEqual(schemas[name].spec);
            expect(config).toEqual(schemas[name].config);
        });

        it('should cover every accessor the chart has, and nothing it lacks', () => {
            const chart = (core as unknown as Record<string, () => object>)[
                name
            ]();
            const accessors = Object.keys(chart).filter(
                (key) =>
                    key !== 'on' &&
                    !(notConfigurationMethods as readonly string[]).includes(
                        key
                    )
            );

            expect(Object.keys(config.properties).sort()).toEqual(
                [...accessors, ...britechartsCustomEvents].sort()
            );
        });
    });
});
