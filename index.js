
const { init_socket_server } = require('./socketserver');
const { init_webserver } = require('./webserver');

module.exports = { 
    init: (WEB_PORT, SOCKET_PORT) => {
        this.SOCKET_PORT = SOCKET_PORT;
        this.SOCKET_SERVER = init_socket_server(SOCKET_PORT);
        
        this.WEB_PORT = WEB_PORT;
        this.WEB_SERVER = init_webserver(WEB_PORT, SOCKET_PORT);
    },
}
