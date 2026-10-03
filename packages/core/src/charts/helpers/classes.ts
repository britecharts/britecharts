/**
 * Helps process a class array or set of classes
 * @private
 */
export function classArray(...classes: [classArr: string[]] | string[]): {
    asList: () => string;
    asSelector: () => string;
} {
    // The JavaScript read `[...arguments]` when the first argument was not an
    // array. A rest parameter says the same thing and types, where `arguments`
    // would be `IArguments` and spread to `any[]`.
    //
    // Both shapes are kept because both are the declared contract, even though
    // grid.js -- the only caller -- uses the variadic one
    // (`classArray(COMPONENT_CLASSNAME, orient)`).
    const [first] = classes;
    const classArr = Array.isArray(first) ? first : (classes as string[]);

    return {
        asList: () => classArr.join(' '),
        asSelector: () => '.' + classArr.join('.'),
    };
}

export default {
    classArray,
};
