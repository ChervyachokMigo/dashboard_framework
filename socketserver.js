

const WebSocket = require('ws');
const { isJSON } = require('./tools');

const send = (client, action, response_data) => {
    client.send(JSON.stringify({action, response_data}) );
}

let clients = [];

const _status = {
    list: [],
};

module.exports = {
    get_status: () => {
        return _status;
    },

    add_status_item: (name, text, values, status) => {
        _status.list.push({name, text, values, status});
    },

    change_status_item: (name, status) => {
        if (clients.length === 0){
            return false;
        }

        console.log('change_status_item', {name, status} );

        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        if (_status.list[i].values.find( v => v.name === status)) {
            _status.list[i].status = status;
        }

        clients.forEach ( v => {
            send(v, 'change_status_item', {name, status});
        });

    },

    change_text_item: (name, item_name, text) => {
        if (clients.length === 0){
            return false;
        }

        console.log('change_text_item', {name, text} );

        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        const v = _status.list[i].values.findIndex( v => v.name === item_name);
        if (v === -1) {
            return false;
        }

        _status.list[i].values[v].text = text;

        if (_status.list[i].status === item_name) {
            clients.forEach ( v => {
                send(v, 'change_text_item', {name, item_name, text});
            });
        }
    },

    change_status_text: (name, text) => {
        if (clients.length === 0){
            return false;
        }

        console.log('change_status_text', {name, text} );

        const i = _status.list.findIndex( v => v.name === name);

        if (i === -1) {
            return false;
        }

        _status.list[i].text = text;

        clients.forEach ( v => {
            send(v, 'change_status_text', {name, text});
        });
        
    },

    init_socket_server: (SOCKET_PORT) => {
        let SOCKET_SERVER = new WebSocket.WebSocketServer({ port: SOCKET_PORT });

        SOCKET_SERVER.on('connection', function connection(client) {
            client.id = new Date().getTime();
            clients.push(client);

            console.log('new connection');
            
            client.on('error', console.error);
            
            client.on('close', ()=> {
                console.log('connection closed');
                for (let i in clients){
                    if (clients[i].id === client.id){
                        clients.splice(i, 1);
                    }
                }
            });

            client.on('message', async function message(data) {
                console.log('received: ' + data);

                if (isJSON(data)){
                    const {action, request_data} = JSON.parse(data);

                    let response_data = null;

                    switch (action) {
                        case 'connected':
                            response_data = 'connection success';
                            break;
                        default:
                            console.log('unknown action');
                    }
                    send(client, action, request_data);

                } else {
                    console.error('"data" is not in JSON format!');
                }
            });
            
            send(client, 'get_status_list', { list: _status.list });

        });

        return SOCKET_SERVER;
    }
}