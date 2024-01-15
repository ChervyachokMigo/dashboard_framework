const settings = require("../misc/settings");
const { clients_send } = require("../server/sockets");
const { log } = require("../misc/tools");

module.exports = {

    get_settings: async (args) => {
        log('get_settings', args);
        await clients_send('get_settings', settings.get() );
    },

    set_setting: async (args) => {
        log('set_setting', args);
        settings.set(args);
        await clients_send('set_setting', args );
    },

}

