let _settings = {};

module.exports = {
    get: () => {
        return { list: _settings };
    },
    
    get: (name) => {
        return _settings[name];
    },

    set: ({name, value}) => {
        _settings[name] = value;
    },
}