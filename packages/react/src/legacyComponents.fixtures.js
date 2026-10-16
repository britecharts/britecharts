/**
 * The components that are still React classes with `static defaultProps`. A
 * ratchet shared by index.spec.js and charts/sourceContract.spec.js: a name
 * here exempts its component from the function-component checks, and the
 * component must still declare defaultProps, so the list cannot go stale.
 * Empty: every component is a function.
 *
 * Note what the specs cannot catch: React 16.14 still honours `defaultProps`
 * on function components, so under jest a function component that keeps them
 * behaves exactly like one using destructured defaults. These checks are what
 * stand between such a component and React 19, which ignores them silently.
 *
 * Not shipped (*.fixtures.js is excluded from the package).
 */
export const LEGACY_DEFAULT_PROPS = [];
