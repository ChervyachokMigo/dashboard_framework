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

const _FEED = {
    list: []
}

const socket_send = (action, request_data = null) => {
    SOCKET.send(JSON.stringify({action, request_data}));
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

const change_status = ({name, status}) => {
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
        $(`.status_item[id=${name}] .status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
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
    
    $(`.status_item[id=${name}] .status_name`).text(`${_STATUS.list[i].text}: ${_STATUS.list[i].values[v].text}`);
}

const create_status_item = ({name, text, values, status}) => {
    $('.status').append(
    `<div class="status_item" id="${name}" title="${text}: ${status}">` +
        '<div class="status_icon"></div>' +
        `<div class="status_name"></div>` +
    '</div>');

    change_status({name, text, values, status});
}

const create_status_list = ({list}) => {
    _STATUS.list = list;
    for (let args of list){
        create_status_item(args);
    }
}

const create_feed_list = ({list}) => {
    _FEED.list = list;
    for (let {feedname, stack} of list){
        for (let args of stack){
            append_event({feedname, ...args});
        }
        
    }
}

const feed_event = ({feedname, id, type, title, desc, url, icon, sound}) => {

    let url_begin = '';
    let url_end = '';

    if (url) {
        url_begin = `<a href="${url}">`;
        url_end = '</a>';
    }

    return `<div class="feed_event" type="${type}" id="${id}">` +
        url_begin + 
        `<div class="feed_event_title">${title}</div>` +
        `<div class="feed_event_desc">${desc}</div>` +
        url_end +
    '</div>'
}

const append_event = (args) => {
    $('.feed').append(feed_event(args));

    while ( Number($('.feed').children().length) > ($( window ).width() / 162  - 0.5)  ) {
        $('.feed').children().last().remove();
    }
}

const prepend_event = (args) => {
    $('.feed').prepend(feed_event(args));

    while ( Number($('.feed').children().length) > ($( window ).width() / 162 - 0.5) ) {
        $('.feed').children().last().remove();
    }
}

const create_feed = ({feedname}) => {
    if (_FEED.list.findIndex( v => v.feedname === feedname) === -1) {
        _FEED.list.push({feedname, event_idx: 0, stack: []});
    }
    return _FEED.list.findIndex( v => v.feedname === feedname);
}

const emit_event = (args) => {
    let i = create_feed(args);
    _FEED.list[i].event_idx = _FEED.list[i].event_idx + 1;
    _FEED.list[i].stack.unshift(args);
    prepend_event(args);
}

const change_event_prop = ({feedname, type, propname, value}) => {
    const i = _FEED.list.findIndex( v => v.feedname === feedname);

    if (i === -1) {
        return false;
    }

    if (_FEED.list[i].stack.length > 0){
        if (type === 'last' || type === 'first'){
            _FEED.list[i].stack[0][propname] = value;
        } else {
            const idxs = _FEED.list[i].stack.map( (val, idx) => {
                if (val.type === type){
                    return idx; 
                }
            });
            for (let x of idxs) {
                _FEED.list[i].stack[x][propname] = value;
            }
        }
    }

    let feed_event_selector = `.feed_event[type=${type}]`;
    if (type === 'last' || type === 'first'){
        feed_event_selector = `.feed_event:first`;
    }

    switch (propname) {
        case 'title':
            $(`${feed_event_selector} .feed_event_title`).text(value);
            break;
        case 'desc':
            $(`${feed_event_selector} .feed_event_desc`).text(value);
            break;
        case 'url':
            if (value){
                if ($(`${feed_event_selector} a`).length === 0) {
                    //нет ссылки
                    let url_begin = `<a href="${value}">`;
                    let url_end = '</a>';
                    $(`${feed_event_selector}`).html(
                        url_begin +
                        $(`${feed_event_selector}`).html() +
                        url_end
                    );
                } else {
                    //изменить ссылку
                    $(`${feed_event_selector} a`).attr('href', value);
                }
            } else {
                //удалить ссылку
                $(`${feed_event_selector}`).html($(`${feed_event_selector} a`).html());
            }
            break;
        default:
            console.error('unknown event prop')
    }
}

const css_load = ({list}) => {
    for (let args of list) {
        css_apply(args);
    }
}

const css_apply = ({selector, prop, value}) => {
    $(selector).css(prop, value);
}

const socket_response = ({action, response_data}) => {
    //console.log(action, ':', response_data);

    const actions = [
        {name: 'connected',         F: null},
        {name: 'get_status_list',   F: create_status_list},
        {name: 'get_feed_list',     F: create_feed_list},
        {name: 'add_status',        F: add_status},
        {name: 'add_status_item',   F: add_status_item},
        {name: 'change_status',     F: change_status},
        {name: 'change_text_item',  F: change_text_item},
        {name: 'change_status_text',F: change_status_text},
        {name: 'create_feed',       F: create_feed},
        {name: 'emit_event',        F: emit_event},
        {name: 'change_event_prop', F: change_event_prop},
        {name: 'css_load',          F: css_load},
        {name: 'css_apply',         F: css_apply},
    ];

    let a = actions.find( v => v.name === action);

    if (a) {
        if (a.F) {
            a.F(response_data);
        }
    } else {
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
        socket_send('get_feed_list');
        socket_send('css_load');
    };
    
    SOCKET.onmessage = ({data}) => {

        if (!isJSON(data)) {
            console.error('response is not json');
            return false;
        }

        socket_response(JSON.parse(data));

    };

});

