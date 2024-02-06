const _feed = {
    list: []
}

const create_feed = ({feedname}) => {
    if (_feed.list.findIndex( v => v.feedname === feedname) === -1) {
        _feed.list.push({feedname, event_idx: 0, stack: []});
    }
    return _feed.list.findIndex( v => v.feedname === feedname);
}

//animations direction
module.exports = {
    get_list: () => {
        return _feed.list;
    },

    create: (args) => {
        return create_feed(args);
    },

    add_event: ({feedname, type, title = '', desc = '', url = '', icon = '', sound = ''}) => {
        let i = create_feed({feedname});
        const date = new Date();
        const id = _feed.list[i].event_idx;
        _feed.list[i].event_idx = _feed.list[i].event_idx + 1;
        _feed.list[i].stack.unshift({id, type, title, date, desc, url, icon, sound});
        return {feedname, id, type, title, date, desc, url, icon, sound};
    },

    change_event_prop: ({feedname, type, propname, value}) => {
        const i = _feed.list.findIndex( v => v.feedname === feedname);

        if (i === -1) {
            return false;
        }

        if (_feed.list[i].stack.length > 0){
            if (type === 'last' || type === 'first'){
                _feed.list[i].stack[0][propname] = value;
            } else {
                const idxs = _feed.list[i].stack.map( (val, idx) => {
                    if (val.type === type){
                        return idx; 
                    }
                });
                for (let x of idxs) {
                    _feed.list[i].stack[x][propname] = value;
                }
            }
        }

    }
}