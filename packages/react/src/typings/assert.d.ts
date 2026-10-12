/**
 * Type-level assertions, used by the converted components to prove that the
 * props they declare are the same type as the props this directory publishes.
 *
 * While the migration runs, a converted component declares its props inline --
 * Storybook's docgen cannot follow an import to find them -- and the
 * hand-written declaration beside it is still what a consumer compiles
 * against. Two copies of a type drift unless something compares them, and
 * `tsc` is the only thing that can. Phase 5 generates the declarations from
 * the components and both the duplication and these helpers go away.
 *
 * Nothing here exists at run time: this file is a declaration, so the build
 * ignores it and no consumer ever imports it.
 */

/**
 * Fails to compile unless `T` is exactly `true`.
 *
 * `Expect<Equal<A, B>>` is therefore an error wherever A and B differ, and the
 * error lands on the assertion rather than somewhere downstream.
 */
export type Expect<T extends true> = T;

/**
 * Whether two types are identical, not merely mutually assignable.
 *
 * The two conditional function types are the standard trick: TypeScript
 * compares them by their deferred instantiation, which is sensitive to
 * differences `extends` in both directions would accept -- optionality, `any`
 * against a concrete type, and the order-free structure of a union.
 */
export type Equal<A, B> =
    (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
        ? true
        : false;
