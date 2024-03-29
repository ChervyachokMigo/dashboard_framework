const _status = {
    list: [],
};

module.exports = {
    get_list: () => {
        return _status.list;
    },

    get_names: () => {
        return _status.list.map( v => v.name);
    },

    add: ({name, text, values, status}) => {
        if (_status.list.findIndex( v => v.name === name) === -1) {
            _status.list.push({name, text, values, status});
            return true;
        }

        return false;
    },

    add_item: ({name, item_name, text, color}) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        if (_status.list[i].values.findIndex( v => v.name === item_name) === -1) {
            _status.list[i].values.push({name: item_name, text, color});
            return true;
        }

        return false;
    },

    change_by_name: ({name, status}) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        if (_status.list[i].values.findIndex( v => v.name === status) > -1) {
            _status.list[i].status = status;
            return true
        }

        return false;
    },

    change_text_by_name: ({name, text}) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        _status.list[i].text = text;
        return true;
    },

    change_item_text_by_name: ({name, item_name, text}) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        const v = _status.list[i].values.findIndex( v => v.name === item_name);
        if (v === -1) {
            return false;
        }

        _status.list[i].values[v].text = text;
        return true;
    },

    compare_current: ({name, item_name}) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        return _status.list[i].status === item_name;
    }
}