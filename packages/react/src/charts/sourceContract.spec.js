import fs from 'fs';
import path from 'path';

import { LEGACY_DEFAULT_PROPS } from '../legacyComponents.fixtures';

/**
 * Static guards for what no jsdom assertion can see. They read the source, so
 * they are cheap and deterministic, and they hold for components that have no
 * ordering test of their own (nine of the eleven charts).
 */
const srcRoot = path.join(__dirname, '..');
const chartsRoot = __dirname;

const isSource = (file) =>
    /\.js$/.test(file) && !/\.(spec|stories|fixtures)\.js$/.test(file);

const sourceFilesUnder = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return sourceFilesUnder(full);
        }

        return isSource(entry.name) ? [full] : [];
    });

const read = (file) => fs.readFileSync(file, 'utf8');
const relative = (file) => path.relative(srcRoot, file);

// Every `export { default as Name } from '...'` line of the entry file
const components = [
    ...read(path.join(srcRoot, 'index.js')).matchAll(
        /export \{ default as ([A-Z]\w*) \} from '([^']+)'/g
    ),
].map(([, name, from]) => ({
    name,
    file: path.join(srcRoot, /\.js$/.test(from) ? from : `${from}.js`),
}));

// Layout effects only, never mixed: they are the ones that flush inside
// React's commit, which is what the lifecycle-order guarantees and the test
// rig depend on. The first legitimate exception is named here, with a reason.
const USE_EFFECT_ALLOWED = [];

describe('source contract', () => {
    it('should find the chart components', () => {
        expect(components.length).toBeGreaterThan(0);
        components.forEach(({ file }) => {
            expect(fs.existsSync(file)).toBe(true);
        });
    });

    describe('effects', () => {
        it('should use no useEffect( in any chart source', () => {
            const offenders = sourceFilesUnder(chartsRoot)
                .filter((file) => /\buseEffect\s*\(/.test(read(file)))
                .map(relative)
                .filter((file) => !USE_EFFECT_ALLOWED.includes(file));

            expect(offenders).toEqual([]);
        });
    });

    // The charts and the tooltip. ResponsiveContainer lives in helpers/ and has
    // no defaultProps to put on the legacy list: it is converted on its own,
    // and joins this check then.
    describe.each(
        components.filter(
            ({ name, file }) =>
                !LEGACY_DEFAULT_PROPS.includes(name) &&
                !file.includes(`${path.sep}helpers${path.sep}`)
        )
    )('converted component $name', ({ file }) => {
        const source = read(file);

        it('should not be a class', () => {
            expect(source).not.toMatch(
                /extends\s+(React\.)?(Pure)?Component\b/
            );
        });

        it('should not declare defaultProps', () => {
            expect(source).not.toMatch(/static\s+defaultProps/);
            expect(source).not.toMatch(/\.defaultProps\s*=/);
        });

        it('should not use useEffect(', () => {
            expect(source).not.toMatch(/\buseEffect\s*\(/);
        });
    });
});
