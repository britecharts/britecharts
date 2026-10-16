import { defineConfig } from 'vite';

// The UMD bundle carries core, wrappers and d3, and takes React from the
// page or the consumer's install.
export default defineConfig({
    oxc: {
        // The components import React; the classic runtime keeps the bundle
        // from requiring react/jsx-runtime, which has no UMD global.
        jsx: { runtime: 'classic' },
    },
    build: {
        outDir: 'dist/umd/bundle',
        emptyOutDir: false,
        sourcemap: true,
        target: 'es2020',
        lib: {
            entry: 'src/index.ts',
            formats: ['umd'],
            name: 'react',
            fileName: () => 'react.bundled.min.js',
        },
        rolldownOptions: {
            external: ['react', 'react-dom'],
            output: {
                exports: 'named',
                globals: { react: 'React', 'react-dom': 'ReactDOM' },
                minify: { compress: { dropConsole: true } },
            },
        },
    },
});
