import { defineConfig } from 'vite';

// One run writes the UMD and the CommonJS bundle. Core goes inside them; d3
// stays external, for the consumer's install to provide.
export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        sourcemap: true,
        target: 'es2020',
        lib: {
            entry: 'src/index.ts',
            formats: ['umd', 'cjs'],
            name: 'wrappers',
            fileName: (format) => `${format}/bundle/wrappers.bundled.min.cjs`,
        },
        rolldownOptions: {
            external: (id) => id.startsWith('d3-'),
            output: {
                exports: 'named',
                globals: (id) => id,
            },
        },
    },
});
