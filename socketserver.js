

const WebSocket = require('ws');
const { isJSON } = require('./tools');
const { get_status_list } = require('./status');


let clients = [];

const send = (client, action, response_data) => {
    client.send(JSON.stringify({action, response_data}) );
}

module.exports = {
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
                        case 'get_status_list':
                            response_data = { list: get_status_list() };
                            break;
                        default:
                            console.log('unknown action');
                    }
                    send(client, action, response_data);
                } else {
                    console.error('"data" is not in JSON format!');
                }
            });

        });

        return SOCKET_SERVER;
    },

    clients_send: (action, data) => {
        if (clients.length === 0){
            return false;
        }
    
        clients.forEach ( v => {
            send(v, action, data);
        });
    },

}