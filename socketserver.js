

const WebSocket = require('ws');
const { isJSON } = require('./tools');

module.exports = {
    init_socket_server: (SOCKET_PORT) => {
        let SOCKET_SERVER = new WebSocket.WebSocketServer({ port: SOCKET_PORT });

        SOCKET_SERVER.on('connection', function connection(client) {
            console.log('new connection');

            client.on('error', console.error);
            
            client.on('close', ()=> {
                console.log('connection closed');
            });

            client.on('message', async function message(data) {
                console.log('received: ' + data);

                if (isJSON(data)){
                    const {action, request_data} = JSON.parse(data);

                    let response_data = null;

                    switch (action) {
                        case 'connected':
                            response_data = 'connection sucess';
                            break;
                        default:
                            console.log('unknown action');
                    }
                    client.send(JSON.stringify({action, response_data}) );
                } else {
                    console.error('"data" is not in JSON format!');
                }
            });

        });

        return SOCKET_SERVER;
    }
}