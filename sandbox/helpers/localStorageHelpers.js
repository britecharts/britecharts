const {rootSaveKey} = require('../constants/constants').saveKeys;
const {throwUndefinedError} = require('./utils');

module.exports = (function() {

    return {
        getDataByKey(key=throwUndefinedError('getDataByKey', 'key')) {
            let currentData = this.getData();

            if (currentData) {
                return currentData[key];
            }
        },
        setDataByKey(
            key=throwUndefinedError('setDataByKey', 'key'),
            data=throwUndefinedError('setDataByKey', 'data')
        ) {
            let currentData = this.getData();

            if (currentData) {
                let nextData = {...currentData, [key]: data};

                this._setData(nextData);
            }
        },
        getData() {
            let currentData = localStorage.getItem(rootSaveKey);
            let parsedData = null;

            if (!currentData) {
                localStorage.setItem(rootSaveKey, JSON.stringify({}));
                currentData = localStorage.getItem(rootSaveKey);
            }

            try {
                parsedData = JSON.parse(currentData);
            } catch(e) {
                // errorList.push(new Error('Cannot load root data'));
            }

            return parsedData;
        },
        _setData(data=throwUndefinedError('_setData', 'data')) {
            let jsonData = JSON.stringify(data);

            localStorage.setItem(rootSaveKey, jsonData);
        },
        removeDataByKey(key=throwUndefinedError('removeDataByKey', 'key')) {
            let currentData = this.getData();

            if (currentData && currentData[key]) {
                delete currentData[key];
                this._setData(currentData);
            }
        },
        clear() {
            localStorage.removeItem(rootSaveKey);
        }
    };
}());
