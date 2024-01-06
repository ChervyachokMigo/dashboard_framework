const _status = {
    list: [],
};

module.exports = {
    get_status_list: () => {
        return _status.list;
    },

    add_status_item: (name, text, values, status) => {
        _status.list.push({name, text, values, status});
    },

    get_status_index_by_name: (name) => {
        return _status.list.findIndex( v => v.name === name);
    },

    get_status_item_index_by_item_name: (i, name) => {
        return _status.list[i].values.findIndex( v => v.name === name)
    },

    change_status_by_index: (i, new_status) => {
        _status.list[i].status = new_status;
    },

    change_status_by_name: (name, status) => {
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

    change_status_text_by_name: (name, text) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        _status.list[i].text = text;
        return true;
    },

    change_status_item_text_by_name: (name, item_name, text) => {
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

    compare_current_status: (name, item_name) => {
        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        return _status.list[i].status === item_name;
    }
}