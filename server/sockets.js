

const WebSocket = require('ws');
const { isJSON, log } = require('./misc/tools');
const status = require('./data/status');
const feed = require('./data/feed');
const style = require('./data/style');
const settings = require('./misc/settings');
const { get_image_html } = require('./data/image');
const { get_notifies } = require('./data/notify');
const { get_screens, get_current_screen } = require('./data/screen');
const progress = require('./data/progress');
const sorted = require('./data/sorted_list');

let clients = [];

const send = async (client, action, response_data) => {
    await client.send(JSON.stringify({action, response_data}) );
}

let SOCKET_SERVER = null;

module.exports = {
    init_socket_server: (SOCKET_PORT) => {
        SOCKET_SERVER = new WebSocket.WebSocketServer({ port: SOCKET_PORT });

        SOCKET_SERVER.on('connection',  (client) => {
            client.id = new Date().getTime();
            clients.push(client);

            log('new connection');
            
            client.on('error', console.error);
            
            client.on('close', () => {
                log('connection closed');
                for (let i in clients){
                    if (clients[i].id === client.id){
                        clients.splice(i, 1);
                    }
                }
            });

            client.on('message', async (data) => {
                log('received: ' + data);

                if (isJSON(data)){
                    const {action, request_data} = JSON.parse(data);

                    let response_data = null;

                    switch (action) {
                        case 'connected':
                            response_data = 'connection success';
                            break;
                        case 'get_status_list':
                            response_data = { list: status.get_list() };
                            break;
						case 'get_progress_list':
							response_data = { list: progress.get_list() };
							break;
                        case 'get_feed_list':
                            response_data = { list: feed.get_list() };
                            break;
                        case 'css_load':
                            response_data = { list: style.get_list() };
                            break;
                        case 'get_settings':
                            response_data = { list: settings.get_list() };
                            break;
                        case 'get_image': 
                            response_data = { ...get_image_html(request_data) };
                            break;
                        case 'get_notifies': 
                            response_data = { list: get_notifies() };
                            break;
                        case 'get_screens': 
                            response_data = { list: get_screens() };
                            break;
                        case 'get_current_screen': 
                            response_data = { current: get_current_screen() };
                            break;
						case 'get_sorted_list':
							response_data = { list: sorted.get_list() };
                            break;
                        default:
                            log('unknown action');
                    }
                    await send(client, action, response_data);
                } else {
                    console.error('"data" is not in JSON format!');
                }
            });

        });

        return SOCKET_SERVER;
    },

    clients_send: async (action, data) => {
        if (clients.length === 0){
            return false;
        }
    
        for (let c of clients) {
            await send(c, action, data);
        };
    },

	// destroy_socket_server: async () => {
	// 	console.log('closing socket server');
	// 	return await new Promise ( (res, rej) => {
	// 		if (clients.length > 0) {
	// 			clients.forEach( v => {
	// 				v.close();
	// 			});
	// 		}

	// 		SOCKET_SERVER.close((err) => {
	// 			if (err) {
	// 				rej(err);
	// 			}
	// 			res(true);
	// 		})
	// 	});
	// }

}