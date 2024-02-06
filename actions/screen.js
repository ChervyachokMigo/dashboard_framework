const { clients_send } = require("../server/sockets");
const _screen = require("../server/data/screen");
const { log } = require("../misc/tools");

module.exports = {
    set_current_screen: async (args) => {
        log('set_current_screen', args);
        _screen.set_current_screen(args);
        await clients_send('set_current_screen', args);
    },

    bind_screen_element: async (args) => {
        log('bind_screen_element', args);
        _screen.bind_screen_element(args);
        await clients_send('bind_screen_element', args);
    },

    get_screens: async () => {
        const list = _screen.get_screens();
        log('get_screens', {list});
        await clients_send('get_screens', {list});
    },

    get_current_screen: async () => {
        const name = _screen.get_current_screen();
        log('get_current_screen', {name});
        await clients_send('get_current_screen', {name});
    }
}