const ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

const {
    theme,
    mode
} = require('../constants/constants').editorConfig;

module.exports = (function() {

    return {
        createEditors({dataInputId, chartInputId}) {
            const dataEditor = ace.edit(dataInputId);
            const configEditor = ace.edit(chartInputId);

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
    }
}());
