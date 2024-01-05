
const { init_socket_server, add_status_item, change_status_item } = require('./socketserver');
const { init_webserver } = require('./webserver');

module.exports = {
    prepare: (list) => {
        for (let {name, values, status} of list){
            add_status_item(name, values, status);
        }
    },

    run: async (WEB_PORT, SOCKET_PORT) => {
        this.SOCKET_PORT = SOCKET_PORT;
        this.SOCKET_SERVER = init_socket_server(SOCKET_PORT);
        
        this.WEB_PORT = WEB_PORT;
        this.WEB_SERVER = await init_webserver(WEB_PORT, SOCKET_PORT);
    },

    change_status_item
}
