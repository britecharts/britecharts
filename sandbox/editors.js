module.exports = function(config) {
    let {
        dataInputId,
        chartInputId
    } = config;

    let {
        theme,
        mode
    } = require('./constants').editorConfig;

    let dataEditor = ace.edit(dataInputId);
    let configEditor = ace.edit(chartInputId);

    [dataEditor, configEditor].forEach((editor) => {
        editor.setTheme(theme);
        editor.getSession().setMode(mode);
        // remove unwanted warning
        editor.$blockScrolling = Infinity;
    });

    // Config Editor
    configEditor.renderer.setShowGutter(false);

    return {
        dataEditor,
        configEditor
    };
}