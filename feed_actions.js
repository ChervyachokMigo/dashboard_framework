
const { clients_send } = require("./socketserver");
const _feed = require("./feed");

module.exports = {
    create_feed: (args) => {
        console.log('create_feed', args);
        _feed.create(args);
        clients_send('create_feed', args);
    },

    emit_event: (args) => {
        console.log('emit_event', args);
        const new_event = _feed.add_event(args);
        clients_send('emit_event', new_event);
    },

    change_event_prop: (args) => {
        console.log('change_event_prop', args);
        _feed.change_event_prop(args);
        clients_send('change_event_prop', args);
    },
}