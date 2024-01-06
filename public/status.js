const isJSON = (str) => {
    try {
        JSON.parse(str.toString());
    } catch (e) {
        return false;
    }
    return true;
}

let SOCKET = null;
let SOCKET_PORT = null;

const _STATUS = {
    list: []
}

const socket_send = (action, request_data = null) => {
    SOCKET.send(JSON.stringify({action, request_data}));
}

const change_status = (name, status) => {
    const item = _STATUS.list.find( v => v.name === name );
    if (!item) {
        return false;
    }

    const value = item.values.find( v => v.name === status);
    if (!value) {
        return false;
    }

    const {color} = value;

    $(`.status_item[id=${name}]`).attr('title', `${name}: ${status}`);
    $(`.status_item[id=${name}] .status_name`).text(`${item.text}: ${value.text}`);
    $(`.status_item[id=${name}] .status_icon`).css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
}

const change_text_item = (name, item_name, text) => {
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
        $(`.status_item[id=${name}] .status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
    }
}

const change_status_text = (name, text) => {
    const i = _STATUS.list.findIndex( v => v.name === name );
    if (i === -1) {
        return false;
    }

    const v = _STATUS.list[i].values.findIndex( v => v.name === _STATUS.list[i].status);
    if (v === -1) {
        return false;
    }

    _STATUS.list[i].text = text;
    
    $(`.status_item[id=${name}] .status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
}

const create_status_item = ({name, text, values, status}) => {
    $('.status').append(
    `<div class="status_item" id="${name}" title="${text}: ${status}">` +
        '<div class="status_icon"></div>' +
        `<div class="status_name"></div>` +
    '</div>');

    change_status(name, status);
}

const create_status_list = ({list}) => {
    _STATUS.list = list;
    for (let list_item of list){
        create_status_item(list_item);
    }
    
}

const socket_response = ({action, response_data}) => {
    switch (action){
        case 'connected':
            console.log(action, ':', response_data);
            break;
        case 'get_status_list':
            create_status_list(response_data);
            console.log(action, ':', response_data);
            break;
        case 'change_status':
            change_status(response_data.name, response_data.status);
            console.log(action, ':', response_data);
            break;
        case 'change_text_item':
            change_text_item(response_data.name, response_data.item_name, response_data.text);
            console.log(action, ':', response_data);
            break;
        case 'change_status_text':
            change_status_text(response_data.name, response_data.text);
            console.log(action, ':', response_data);
            break;
        default:
            console.error('unknown action');
    }
}

$(document).ready(function(){
    SOCKET_PORT = Number($('#SOCKET_PORT').attr('data'));

    if (isNaN(SOCKET_PORT)){
        throw new Error('unknown SOCKET PORT');
    }

    SOCKET = new WebSocket(`ws://localhost:${SOCKET_PORT}`);

    SOCKET.onopen = () => {
        SOCKET.onclose = (ev) => {
            console.error('connection close');
            console.log(ev);
            location.reload();
        };
        
        SOCKET.onerror = (err) => {
            console.error('connection error');
            console.log(err);
            location.reload();
        };
    
        socket_send('connected');
        socket_send('get_status_list');

    };
    
    SOCKET.onmessage = ({data}) => {

        if (!isJSON(data)) {
            console.error('response is not json');
            return false;
        }

        socket_response(JSON.parse(data))

    };
});

