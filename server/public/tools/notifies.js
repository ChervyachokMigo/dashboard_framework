const _notifies = {
    list: []
};

const set_notifies = ({list}) => {
    _notifies.list = list;
}

const get_notify_path = (name) => {
    const notify = _notifies.list.find( v => v.name === name);
    if (!notify){
        return null;
    } else {
        return `sounds/${notify.md5}`;
    }
}
