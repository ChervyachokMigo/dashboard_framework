const _sorted = {
    list: [],
};

const sort = () => {
	_sorted.list.sort((a, b) => b.value - a.value);
}

module.exports = {
    get_list: () => {
        return _sorted.list;
    },

    add: ({ name, value }) => {
        if (_sorted.list.findIndex( v => v.name === name) === -1) {
            _sorted.list.push({ name, value });
			sort();
            return true;
        }

        return false;
    },

    change: ({ name, value }) => {
        const i = _sorted.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

		_sorted.list[i].value = value;
		sort();
		return true;
    },

	remove: ({ name }) => {
		const i = _sorted.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        _sorted.list.splice(i, 1);
        sort();
        return true;
    },

	get_one: ({ name }) => {
		const i = _sorted.list.findIndex( v => v.name === name);

        if (i === -1) {
            return null;
        }

        return _sorted.list[i];
    },	

}