import fs from 'fs';
import path from 'path';

import * as exported from './index';

const source = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

// Every `export { default as Name } from '...'` line, read from the source so
// the list of components is never written out by hand here.
const reExports = [
    ...source.matchAll(/export \{ default as (\w+) \} from '([^']+)'/g),
].map(([, name, from]) => ({ name, from }));

// Components are capitalised; `withResponsiveness` is a higher-order function
// that returns one, so it has no propTypes or defaultProps of its own.
const components = reExports
    .map(({ name }) => name)
    .filter((name) => /^[A-Z]/.test(name));

/**
 * The components that still declare `static defaultProps`. A ratchet: each
 * conversion of a class component to a function deletes exactly one line, so
 * a component left half-converted fails loudly at every intermediate state
 * instead of relying on a reviewer to notice. Empty when the migration is
 * done.
 *
 * Note what this cannot catch: React 16.14 still honours `defaultProps` on
 * function components, so under jest a half-done conversion (defaultProps left
 * in place) behaves exactly like a finished one. This list is what stands
 * between such a component and React 19, which ignores it silently.
 */
const LEGACY_DEFAULT_PROPS = [
    'Bar',
    'Bullet',
    'Donut',
    'GroupedBar',
    'Legend',
    'ScatterPlot',
    'Sparkline',
    'StackedArea',
    'StackedBar',
    'Tooltip',
];

describe('package surface', () => {
    it('should find the components exported from the entry file', () => {
        expect(components.length).toBeGreaterThan(0);
    });

    describe.each(components)('%s', (name) => {
        it('should be exported as a function', () => {
            expect(typeof exported[name]).toBe('function');
        });

        it('should keep its propTypes', () => {
            // react-docgen reads them for Storybook's Controls; nothing else
            // would notice them vanishing
            expect(exported[name].propTypes).toBeDefined();
        });

        if (LEGACY_DEFAULT_PROPS.includes(name)) {
            it('should still declare defaultProps, and so be on the legacy list', () => {
                // Fails once converted: delete the name from the list
                expect(exported[name].defaultProps).toBeDefined();
            });
        } else {
            it('should not declare defaultProps', () => {
                // React 19 ignores defaultProps on function components; use
                // destructured defaults instead
                expect(exported[name].defaultProps).toBeUndefined();
            });
        }
    });

    it('should only list components that are exported on the legacy list', () => {
        expect(
            LEGACY_DEFAULT_PROPS.filter((name) => !components.includes(name))
        ).toEqual([]);
    });

    // Sparkline is exported without a file extension. Fixed in Phase 5,
    // when the entry file is rewritten: flip this to `it` then.
    it.failing('should export every component with a file extension', () => {
        expect(reExports.filter(({ from }) => !/\.js$/.test(from))).toEqual([]);
    });
});
