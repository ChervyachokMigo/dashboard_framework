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

const change_status_item = (name, status) => {
    const item = _STATUS.list.find( v => v.name === name );
    console.log('item', item)
    if (!item) {
        return false;
    }

    console.log(item.values)
    const value = item.values.find( v => v.name === status);
    console.log('value', value)
    if (!value) {
        return false;
    }

    const {color} = value;

    $(`.status_item[id=${name}] .status_icon`).css('background-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);

}

const create_status_item = ({name, values, status}) => {
    $('.status').append(
    `<div class="status_item" id="${name}">` +
        '<div class="status_icon"></div>' +
        `<div class="status_name">${name}</div>` +
    '</div>');

    change_status_item(name, status);
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
        case 'change_status_item':
            change_status_item(response_data.name, response_data.status);
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
    
        socket_send('connected')

    };
    
    SOCKET.onmessage = ({data}) => {

        if (!isJSON(data)) {
            console.error('response is not json');
            return false;
        }

        socket_response(JSON.parse(data))

    };
});

