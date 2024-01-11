const { inspect } = require('util');

const { clients_send } = require("../server/sockets");
const _status = require("../server/data/status");
const { log } = require('../misc/tools');

module.exports = {

    /**
     * @param {*} name "status name"
     * @param {*} status "new status from list" 
     */
    change_status: async (args) => {
        log('change_status', args );
        _status.change_by_name(args);
        await clients_send('change_status', args);
    },

    /**
     * @param {*} name "status name"
     * @param {*} item_name "status item name"
     * @param {*} text "new text for status item"
     */
    change_text_item: async (args) => {
        log('change_text_item', args );
        _status.change_item_text_by_name (args);
        if (_status.compare_current(args)) {
            await clients_send('change_text_item', args);
        }
    },

    /**
     * @param {*} name "status name"
     * @param {*} text "new text for status"
     */
    change_status_text: async (args) => {
        log('change_status_text', args);
        _status.change_text_by_name(args);
        await clients_send('change_status_text', args);
    },

    /**
     * @param name "status name"
     * @param text "status text"
     * @param values status items Array [{name:"status name", item_name: "status item name", text: "status item text", color: [R, G, B]}]
     * @param status "current status name"
     */
    add_status: async (args) => {
        log('add_status', args );
        _status.add(args);
        await clients_send('add_status', args);
    },

    /**
     * @param name "status name"
     * @param item_name "status item name"
     * @param text "status item text"
     * @param color [R, G, B]
     */
    add_status_item: async (args) => {
        log('add_status_item', args );
        _status.add_item(args);
        await clients_send('add_status_item', args);
    },

    /**
     * @param {*} list "set new status list"
     */
    set_status: async (list) => {
        log('set_status', inspect(list, {showHidden: false, depth: null, colors: true}) );
        for (let args of list){
            _status.add(args);
            await clients_send('add_status', args);
        }
    },

}