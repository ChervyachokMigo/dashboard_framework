const { inspect } = require('util');

const { clients_send } = require("../sockets");
const _sorted_list = require("../data/sorted_list");
const { log } = require('../misc/tools');

module.exports = {
	add_sorted: async (args) => {
		log('add_sorted', args );
        _sorted_list.add(args);
        await clients_send('add_sorted', args);
	},

    change_sorted: async (args) => {
        log('change_sorted', args );
        _sorted_list.change(args);
        await clients_send('change_sorted', args);
    },

	remove_sorted: async (args) => {
		log('remove_sorted', args );
        _sorted_list.remove(args);
        await clients_send('remove_sorted', args);
	},
}