// The ESM build only, used by `build:esm` through --config-file.
//
// onlyRemoveTypeImports: false keeps Babel 7's elision, which Babel 8 turned
// off by default: an import used only as a type, or not at all, is dropped.
// Kept, it would ask a module at run time for an export that exists only in
// the type system, `Selection` from d3-selection for one, and fail to link.
module.exports = {
    presets: [['@babel/preset-typescript', { onlyRemoveTypeImports: false }]],
};
