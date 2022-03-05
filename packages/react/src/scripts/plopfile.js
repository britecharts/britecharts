module.exports = function (plop) {
    plop.setHelper('openBrace', () => '{');
    plop.setHelper('closeBrace', () => '}');
    plop.setGenerator('component', {
        description: 'Create a new component',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message:
                    'Component name (with PascalCase capitalization, eg StackedArea)',
            },
        ],
        actions: [
            {
                type: 'add',
                path:
                    '../charts/{{camelCase componentName}}/{{camelCase componentName}}Chart.test.js',
                templateFile: '../templates/componentChart.test.js',
            },
            {
                type: 'add',
                path:
                    '../charts/{{camelCase componentName}}/{{camelCase componentName}}Chart.js',
                templateFile: '../templates/componentChart.js',
            },
            {
                type: 'add',
                path:
                    '../charts/{{camelCase componentName}}/{{camelCase componentName}}Chart.fixtures.js',
                templateFile: '../templates/componentChart.fixtures.js',
            },
            {
                type: 'add',
                path:
                    '../charts/{{camelCase componentName}}/{{pascalCase componentName}}.js',
                templateFile: '../templates/Component.js',
            },
            {
                type: 'add',
                path:
                    '../charts/{{camelCase componentName}}/{{pascalCase componentName}}.test.js',
                templateFile: '../templates/Component.test.js',
            },
            {
                type: 'add',
                path: '../charts/{{camelCase componentName}}/Readme.md',
                templateFile: '../templates/Readme.md',
            },
            {
                type: 'add',
                path: '../charts/{{camelCase componentName}}/Checklist.md',
                templateFile: '../templates/Checklist.md',
            },
        ],
    });
};
