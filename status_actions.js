const { clients_send } = require("./socketserver");
const _status = require("./status");
const { inspect } = require('util');

module.exports = {

    change_status: (name, status) => {

        console.log('change_status', {name, status} );

        _status.change_by_name(name, status);

        clients_send('change_status', {name, status});

    },

    change_text_item: (name, item_name, text) => {

        console.log('change_text_item', {name, text} );

        _status.change_item_text_by_name (name, item_name, text);
        
        if (_status.compare_current(name, item_name)) {
            clients_send('change_text_item', {name, item_name, text});
        }

    },

    change_status_text: (name, text) => {

        console.log('change_status_text', {name, text} );

        _status.change_text_by_name(name, text);

        clients_send('change_status_text', {name, text});

    },

    /**
     * {name, text, values, status}
     * @param name "status name"
     * @param text "status text"
     * @param values status items Array [{name:"status name", item_name: "status item name", text: "status item text", color: [R, G, B]}]
     * @param status "current status name"
     * 
     */
    add_status: (args) => {
        console.log('add_status', args );

        _status.add(args);

        clients_send('add_status', args);
    },

    /**
     * 
     * @param name "status name"
     * @param item_name "status item name"
     * @param text "status item text"
     * @param color [R, G, B]
     * 
     */
    add_status_item: (args) => {
        console.log('add_status_item', args );

        _status.add_item(args);

        clients_send('add_status_item', args);
    },

    set_status: (list) => {
        console.log('set_status', inspect(list, {showHidden: false, depth: null, colors: true}) );
        for (let args of list){
            _status.add(args);
            clients_send('add_status', args);
        }
    },

}