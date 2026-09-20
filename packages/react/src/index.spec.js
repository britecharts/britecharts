import fs from 'fs';
import path from 'path';

import * as exported from './index';
import { LEGACY_DEFAULT_PROPS } from './legacyComponents.fixtures';

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

    // Every export names its file with the extension: the ES module entry is
    // read by bundlers and by Node, and only some of them add it for you.
    it('should export every component with a file extension', () => {
        expect(reExports.filter(({ from }) => !/\.js$/.test(from))).toEqual([]);
    });
});
