// @ts-ignore

const { init_socket_server } = require('./server/sockets');

const { init_webserver } = require('./server/webs');

module.exports = {
    settings: {...require('./misc/settings.js')},
    
    ...require('./actions/status'),
    ...require('./actions/feed'),
    ...require('./actions/style'),

    run: async (WEB_PORT, SOCKET_PORT) => {
        this.SOCKET_PORT = SOCKET_PORT;
        this.SOCKET_SERVER = init_socket_server(SOCKET_PORT);
        
        this.WEB_PORT = WEB_PORT;
        this.WEB_SERVER = await init_webserver(WEB_PORT, SOCKET_PORT);
    },

}
