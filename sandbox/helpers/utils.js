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
        },
        evalDataString(dataString) {
            if (dataString.trim()[0] === '{') {
                // eval does not work on js objects
                return eval('['.concat(dataString).concat(']')).pop();
            } else {
                return eval(dataString);
            }
        }
    }
}());
