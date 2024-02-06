const _SCREEN = {
    list: [],
    current: null
}

const set_screens = ({list}) => {
    log('set_screens', {list});

    _SCREEN.list = list;
}

const bind_screen_element = ({name, element}) => {
    log('bind_screen_element', {name, element});

    if (!name) {
        return false;
    }

    if (!element) {
        return false;
    }

    let i = _SCREEN.list.findIndex( v => v.name === name);

    if (i === -1)
        i = _SCREEN.list.push({ name, elements: [] }) - 1;

    _SCREEN.list[i].elements.push(element);
}

const set_current_screen = ({name}) => {
    log('set_current_screen', {name});

    if (!name) {
        return false;
    }

    let i = _SCREEN.list.findIndex( v => v.name === name);
    if (i === -1)
        return false;

    _SCREEN.current = _SCREEN.list[i].name;
}