const _progress = {
    list: [],
};

const available_props = ['title', 'value', 'max_value'];

module.exports = {
	get_list: () => {
        return _progress.list;
    },

	get_names: () => {
        return _progress.list.map( v => v.name);
    },

	add: ({ name, title, value, max_value }) => {
        if (_progress.list.findIndex( v => v.name === name) === -1) {
            _progress.list.push({ name, title, value, max_value });
            return true;
        }

        return false;
    },

	change_progress_value: ({ name, prop, value }) => {
        const i = _progress.list.findIndex( v => v.name === name);

        if (i === -1 || available_props.indexOf(prop) === -1 ) {
            return false;
        }
		_progress.list[i][prop] = value;
		return true
    },
}