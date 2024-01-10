
const { clients_send } = require("../server/sockets");
const _feed = require("../server/data/feed");
const settings = require("../misc/settings");
const { log } = require("../misc/tools");

module.exports = {
    create_feed: (args) => {
        log('create_feed', args);
        _feed.create(args);
        clients_send('create_feed', args);
    },

    emit_event: (args) => {
        log('emit_event', args);
        const new_event = _feed.add_event(args);
        clients_send('emit_event', new_event);
    },

    change_event_prop: (args) => {
        log('change_event_prop', args);
        _feed.change_event_prop(args);
        clients_send('change_event_prop', args);
    },
}