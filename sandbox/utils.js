module.exports = (function() {
    return {
        throwUndefinedError(method, varName) {
            throw new Error(`${varName} is undefined for method ${method}`);
        },
        prettifyJson(data) {
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            return JSON.stringify(data, null, '\t');
        },
        prettifyInitString(initString) {
            // split on . outside of parens
            return initString.split(/\.\s*(?![^()]*\))/).join('\n\t.').replace(/\n\n/,'\n');
        }
    }
}());