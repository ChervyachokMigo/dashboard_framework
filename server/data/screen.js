const _screen = {
    list: [],
    current: null
}

module.exports = {
    get_screens: () => {
        return _screen.list;
    },

    get_current_screen: () => {
        return _screen.current;
    },

    bind_screen_element: ({name, element}) => {
        if (!name) {
            return false;
        }

        if (!element) {
            return false;
        }

        let i = _screen.list.findIndex( v => v.name === name);

        if (i === -1)
            i = _screen.list.push({ name, elements: [] }) - 1;

        _screen.list[i].elements.push(element);
    },

    set_current_screen: ({name}) => {
        if (!name) {
            return false;
        }

        let i = _screen.list.findIndex( v => v.name === name);
        if (i === -1)
            return false;

        _screen.current = _screen.list[i].name;
    },

    check: ({name, element}) => {
        if (!name) {
            return false;
        }

        if (!element) {
            return false;
        }

        let i = _screen.list.findIndex( v => v.name === name);
        if (i === -1)
            return false;

        return _screen.list[i].elements.findIndex( v => v === element) > -1;
    },

    get_elements: ({name}) => {
        if (!name) {
            return null;
        }

        let i = _screen.list.findIndex( v => v.name === name);
        if (i === -1)
            return null;

        return _screen.list[i].elements;
    }
}