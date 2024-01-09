const _feed = {
    list: []
}

const create_feed = ({feedname}) => {
    if (_feed.list.findIndex( v => v.feedname === feedname) === -1) {
        _feed.list.push({feedname, event_idx: 0, stack: []});
    }
    return _feed.list.findIndex( v => v.feedname === feedname);
}

//limit animations styles direction
module.exports = {
    get_list: () => {
        return _feed.list;
    },

    create: (args) => {
        return create_feed(args);
    },

    add_event: ({feedname, title = '', desc = '', url = '', icon = '', sound = ''}) => {
        let i = create_feed({feedname});
        const date = new Date();
        const id = _feed.list[i].event_idx;
        _feed.list[i].event_idx = _feed.list[i].event_idx + 1;
        _feed.list[i].stack.unshift({id, title, date, desc, url, icon, sound});
        return {id, title, date, desc, url, icon, sound};
    },
}