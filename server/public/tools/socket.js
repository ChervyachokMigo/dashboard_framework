const socket_actions = [
    {name: 'connected',           F: null},
    {name: 'get_status_list',     F: create_status_list},
	{name: 'get_progress_list',	  F: create_progress_list},
	{name: 'change_progress_value',F: change_progress_value},
    {name: 'get_feed_list',       F: create_feed_list},
    {name: 'add_status',          F: add_status},
    {name: 'add_status_item',     F: add_status_item},
    {name: 'change_status',       F: change_status},
    {name: 'change_text_item',    F: change_text_item},
    {name: 'change_status_text',  F: change_status_text},
    {name: 'create_feed',         F: create_feed},
    {name: 'emit_event',          F: emit_event},
    {name: 'change_event_prop',   F: change_event_prop},
    {name: 'css_load',            F: css_load},
    {name: 'css_apply',           F: css_apply},
    {name: 'change_element_text', F: change_element_text},
    {name: 'set_setting',         F: set_setting},
    {name: 'get_settings',        F: get_settings},
    {name: 'get_image',           F: response_image},
    {name: 'set_notifies',        F: set_notifies},
    {name: 'get_notifies',        F: set_notifies},
    {name: 'get_current_screen',  F: set_current_screen},
    {name: 'bind_screen_element', F: bind_screen_element},
    {name: 'get_screens',         F: set_screens},
];

let SOCKET = null;
let SOCKET_PORT = null;

const socket_send = (action, request_data = null) => {
    SOCKET.send(JSON.stringify({action, request_data}));
}

const socket_onconnect = () => {
    socket_send('connected');
    socket_send('get_settings');
    socket_send('get_notifies');
    socket_send('get_status_list');
	socket_send('get_progress_list');
    socket_send('get_feed_list');
    socket_send('css_load');
    socket_send('get_screens');
    socket_send('get_current_screen');
}

const socket_response = ({action, response_data}) => {
    log(action, ':', response_data);

    let a = socket_actions.find( v => v.name === action);

    if (a) {
        if (a.F) {
            a.F(response_data);
        }
    } else {
        console.error('unknown action');
    }

}

const socket_init = () => {
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
    
        socket_onconnect ();
    };
    
    SOCKET.onmessage = ({data}) => {

        if (!isJSON(data)) {
            console.error('response is not json');
            return false;
        }

        socket_response(JSON.parse(data));

    };
}