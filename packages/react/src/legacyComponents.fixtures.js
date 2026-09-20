/**
 * The components that are still React classes with `static defaultProps`. A
 * ratchet shared by index.spec.js and charts/sourceContract.spec.js: each
 * conversion of a class component to a function deletes exactly one line here,
 * so a component left half-converted fails loudly at every intermediate state
 * instead of relying on a reviewer to notice. Empty when the migration is done.
 *
 * Note what the specs cannot catch: React 16.14 still honours `defaultProps`
 * on function components, so under jest a half-done conversion (defaultProps
 * left in place) behaves exactly like a finished one. This list is what stands
 * between such a component and React 19, which ignores it silently.
 *
 * Not shipped (*.fixtures.js is excluded from the package).
 */
export const LEGACY_DEFAULT_PROPS = [
    'Tooltip',
];
