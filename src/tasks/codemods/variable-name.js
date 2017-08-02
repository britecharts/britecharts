const oldVariable = 'verticalTicks';
const newVariable = 'yTicks';

export default function transformer(file, api) {
    const j = api.jscodeshift;
    // returns a collection of one node-path, which wraps the root AST node
    const root = j(file.source);
    // finds the 
    const oldVariableIdentifiers = root.find(j.Identifier, { 
        name: oldVariable
    });

    return oldVariableIdentifiers
        .forEach(path => {
            j(path).replaceWith(
                j.identifier(newVariable)
            );
        })
        .toSource();
}
