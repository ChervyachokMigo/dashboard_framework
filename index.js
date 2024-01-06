
const { init_socket_server } = require('./socketserver');
const { change_status, change_text_item, change_status_text, add_status_item, add_status } = require('./status_actions');
const { init_webserver } = require('./webserver');

module.exports = {
    prepare: (list) => {
        for (let args of list){
            add_status(args);
        }
    },

    run: async (WEB_PORT, SOCKET_PORT) => {
        this.SOCKET_PORT = SOCKET_PORT;
        this.SOCKET_SERVER = init_socket_server(SOCKET_PORT);
        
        this.WEB_PORT = WEB_PORT;
        this.WEB_SERVER = await init_webserver(WEB_PORT, SOCKET_PORT);
    },

    add_status_item,
    change_status,
    change_text_item,
    change_status_text,
    add_status,

}
