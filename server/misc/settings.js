let _settings = {};

module.exports = {
    get_list: () => {
        return _settings;
    },
    
    get: (name) => {
        return _settings[name];
    },

    set: ({name, value}) => {
        _settings[name] = value;
    },
}