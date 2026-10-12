import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

import * as exported from './index';
import { LEGACY_DEFAULT_PROPS } from './legacyComponents.fixtures';

const source = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');

// Where each component's source really is. The entry file names them `.js`
// -- deliberately, since that is what the built ESM output resolves against
// -- so a converted component is on disk as `.tsx` under the same name.
const sourceFileFor = (from) => {
    const base = path.join(__dirname, from).replace(/\.js$/, '');

    return ['.tsx', '.ts', '.js']
        .map((extension) => base + extension)
        .find((candidate) => fs.existsSync(candidate));
};

// What each export takes in place of data, where it takes none.
const ENTRY_PROPS = { ResponsiveContainer: 'render' };
const entryPropFor = (name) => ENTRY_PROPS[name] ?? 'data';

// The props Storybook's own docgen can see in a component's source, asked of
// react-docgen itself rather than of a stand-in. It is ESM-only, so it answers
// in a child process instead of being imported here.
//
// react-docgen-typescript was tried first and is the wrong tool for this
// assertion: it resolves types through the TypeScript compiler, so it follows
// an imported props interface and reports every prop either way -- which is
// precisely the regression this is meant to catch.
const docgenPropsFor = (file) =>
    JSON.parse(
        execFileSync(
            'node',
            [
                '--input-type=module',
                '-e',
                `import { parse } from 'react-docgen';
                 import fs from 'fs';
                 const file = process.argv[1];
                 const parsed = parse(fs.readFileSync(file, 'utf8'), {
                     filename: file,
                     babelOptions: { filename: file },
                 });
                 process.stdout.write(
                     JSON.stringify(Object.keys(parsed[0]?.props ?? {}))
                 );`,
                file,
            ],
            { cwd: path.join(__dirname, '..'), encoding: 'utf8' }
        )
    );

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

        // Storybook builds each chart's Controls from whatever its docgen can
        // read off the source, and nothing else in CI would notice those
        // vanishing. Which mechanism applies depends on the file, so the
        // assertion follows the file:
        //
        //   .js  -- react-docgen reads `Component.propTypes`, so asserting
        //           those exist is asserting exactly what it reads.
        //   .tsx -- it reads the props interface, which therefore has to be
        //           declared in the component file. Imported from
        //           src/typings instead, extraction collapses to the single
        //           destructured `chart` default and every Control for the
        //           chart's own accessors disappears silently. Verified by
        //           probe: the imported form reports ["chart"] and nothing
        //           else.
        const file = sourceFileFor(
            reExports.find((re) => re.name === name).from
        );

        if (file.endsWith('.js')) {
            it('should keep its propTypes, which its Controls are built from', () => {
                expect(exported[name].propTypes).toBeDefined();
            });
        } else {
            it('should declare props in the component file, where the docgen can read them', () => {
                // The prop asserted on is the component's own entry prop:
                // `data` for a chart, `render` for a layout helper that takes
                // no data at all. For a chart it is never a destructured
                // default, so finding it means the props interface itself was
                // read rather than the parameter list -- the regression this
                // guards reports `["chart"]` and nothing else. For a one-prop
                // helper the two coincide, so the assertion is weaker there by
                // nature; there is nothing else to read.
                expect(docgenPropsFor(file)).toContain(entryPropFor(name));
            });
        }

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
