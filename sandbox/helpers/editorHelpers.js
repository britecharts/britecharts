import ace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import constants from '../constants/constants';

const { editorConfig } = constants;
const {
    theme,
    mode
} = editorConfig;

export default ({ dataInputId, chartInputId }) => {
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
};
