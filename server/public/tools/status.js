const _STATUS = {
    list: []
}

const change_status = ({name, status}) => {
    const i = _STATUS.list.findIndex( v => v.name === name);

    if (i === -1) {
        return false;
    }

    if (_STATUS.list[i].values.findIndex( v => v.name === status) > -1) {
        _STATUS.list[i].status = status;
        

        const v = _STATUS.list[i].values.findIndex( v => v.name === status);
        if (v === -1) {
            return false;
        }

        _STATUS.list[i].status = status;

        const {color} = _STATUS.list[i].values[v];

        $(`.status_item[id="${name}"]`).attr('title', `${name}: ${status}`);
        $(`.status_item[id="${name}"]>.status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
        $(`.status_item[id="${name}"]>.status_icon`).css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    }
}

const change_text_item = ({name, item_name, text}) => {
    const i = _STATUS.list.findIndex( v => v.name === name );
    if (i === -1) {
        return false;
    }

    const v = _STATUS.list[i].values.findIndex( v => v.name === item_name);
    if (v === -1) {
        return false;
    }

    _STATUS.list[i].values[v].text = text;

    if (_STATUS.list[i].status === item_name){
        $(`.status_item[id=${name}]>.status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
    }
}

const change_status_text = ({name, text}) => {
    const i = _STATUS.list.findIndex( v => v.name === name );
    if (i === -1) {
        return false;
    }

    const v = _STATUS.list[i].values.findIndex( v => v.name === _STATUS.list[i].status);
    if (v === -1) {
        return false;
    }

    _STATUS.list[i].text = text;
    
    $(`.status_item[id=${name}]>.status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
}

const create_status_item = ({name, text, values, status}) => {
    $('.status').append(
    `<div class="status_item" id="${name}" title="${text}: ${status}">` +
        '<div class="status_icon"></div>' +
        `<div class="status_name"></div>` +
    '</div>');

    change_status({name, status});
}

const create_status_list = ({list}) => {
    _STATUS.list = list;
    for (let args of list){
        create_status_item(args);
    }
}

const add_status_item = ({name, item_name, text, color}) => {
    const i = _STATUS.list.findIndex( v => v.name === name);
    if (i === -1) {
        return false;
    }

    if (_STATUS.list[i].values.findIndex( v => v.name === item_name) === -1) {
        _STATUS.list[i].values.push({name: item_name, text, color});
        return true;
    }

    return false;
}

const add_status = ({name, text, values, status}) => {
    if (_STATUS.list.findIndex( v => v.name === name) === -1) {
        _STATUS.list.push({name, text, values, status});
        return true;
    }

    return false;
}