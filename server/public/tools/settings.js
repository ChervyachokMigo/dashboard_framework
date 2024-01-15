
let _settings = {};

const get_settings = ({ list }) => {
    _settings = {..._settings, ...list};
}

const get_setting = (name) => {
    return get_value_by_key(_settings, name);
}

const set_setting = ({name, value}) => {
    _settings[name] = value;
}