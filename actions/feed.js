
const { clients_send } = require("../server/sockets");
const _feed = require("../server/data/feed");
const settings = require("../misc/settings");
const { log } = require("../misc/tools");

module.exports = {
    /**
     * @param feedname
     */
    create_feed: async (args) => {
        log('create_feed', args);
        _feed.create(args);
        await clients_send('create_feed', args);
    },

    /**
     * @param feedname 
     * @param type
     * @param title
     * @param desc
     * @param url
     * @param icon
     * @param sound
     */
    emit_event: async (args) => {
        log('emit_event', args);
        const new_event = _feed.add_event(args);
        await clients_send('emit_event', new_event);
    },

    change_event_prop: async (args) => {
        log('change_event_prop', args);
        _feed.change_event_prop(args);
        await clients_send('change_event_prop', args);
    },
}