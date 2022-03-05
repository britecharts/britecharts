/**
 * Helps process a class array or set of classes
 * @param {*} classArr      Class array or set of classes
 * @returns                 Methods to get the class array as a list of classes or CSS selectors
 * @private
 */
export function classArray(classArr) {
    classArr = Array.isArray(classArr) ? classArr : [...arguments];

    return {
        asList: () => classArr.join(' '),
        asSelector: () => '.' + classArr.join('.'),
    };
}

export default {
    classArray,
};
