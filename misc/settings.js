// @ts-ignore

let _settings = {};

module.exports = {
    get: () => {
        return _settings;
    },
    
    get: (param) => {
        return _settings[param];
    },

    set: (args) => {
        _settings = args;
    },
}