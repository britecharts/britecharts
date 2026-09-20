import fs from 'fs';
import path from 'path';

import { parse } from '@babel/parser';

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
        /export \{ default as (\w+) \} from '([^']+)'/g
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

    // Every component the package exports, the helpers included
    describe.each(
        components.filter(({ name }) => !LEGACY_DEFAULT_PROPS.includes(name))
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

    // The end state of the migration, and what lets the class-properties Babel
    // plugin go: no class field is left in anything the package publishes. The
    // packages ship their `src/` (the `module` entry, and deep imports), and a
    // toolchain that does not know class fields cannot read one.
    describe('published source', () => {
        const packageRoot = path.join(srcRoot, '..');
        const excludedFolders = JSON.parse(
            read(path.join(packageRoot, 'package.json')).toString()
        )
            .files.filter((entry) => /^!src\/[^*]+\/\*\*$/.test(entry))
            .map((entry) => path.join(packageRoot, entry.slice(1, -3)));

        const isPublished = (file) =>
            isSource(path.basename(file)) &&
            !/DataBuilder\.js$/.test(file) &&
            !excludedFolders.some((folder) =>
                file.startsWith(folder + path.sep)
            );

        const publishedFiles = sourceFilesUnder(srcRoot).filter(isPublished);

        const CLASS_FIELD_NODES = [
            'ClassProperty',
            'ClassPrivateProperty',
            'ClassAccessorProperty',
            'StaticBlock',
        ];

        // Every class field in a piece of source, as `Type line`
        const classFieldsIn = (source) => {
            const ast = parse(source, {
                sourceType: 'module',
                plugins: ['jsx'],
            });
            const found = [];
            const visit = (node) => {
                if (!node || typeof node.type !== 'string') {
                    return;
                }
                if (CLASS_FIELD_NODES.includes(node.type)) {
                    found.push(`${node.type} line ${node.loc.start.line}`);
                }
                Object.values(node).forEach((child) =>
                    Array.isArray(child)
                        ? child.forEach(visit)
                        : child && typeof child === 'object' && visit(child)
                );
            };

            visit(ast.program);

            return found;
        };

        it('should find the files the package publishes', () => {
            expect(publishedFiles.length).toBeGreaterThan(10);
            expect(publishedFiles.map(relative)).toContain('index.js');
            expect(publishedFiles.map(relative)).not.toContain(
                path.join('templates', 'Component.js')
            );
        });

        it('should notice a class field, or the test below proves nothing', () => {
            expect(classFieldsIn('class A { x = 1; }')).toHaveLength(1);
            expect(classFieldsIn('class A { static y = 1; }')).toHaveLength(1);
            expect(
                classFieldsIn('class A { constructor() { this.x = 1; } }')
            ).toHaveLength(0);
        });

        it('should contain no class field, so no Babel proposal plugin is needed to read it', () => {
            const offenders = publishedFiles.flatMap((file) =>
                classFieldsIn(read(file)).map(
                    (field) => `${relative(file)}: ${field}`
                )
            );

            expect(offenders).toEqual([]);
        });
    });
});
