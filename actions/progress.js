const { log } = require("../misc/tools");
const _progress = require("../server/data/progress");
const { clients_send } = require("../server/sockets");

module.exports = {
	/**
     * @param name "progress name"
     * @param title "progress title text"
     * @param value progress current value
	 * @param max_value progress max value
     */
	add_progress: async (args) => {
        log('add_progress', args );
        _progress.add(args);
        await clients_send('add_progress', args);
    },

    /**
     * @param name "progress name"
	 * @param prop "property of progress": "title" | "value" | "max_value"
     * @param value progress new value
     */
	change_progress_value: async (args) => {
        log('change_progress_value', args );
        _progress.change_progress_value (args);
        await clients_send('change_progress_value', args);
    },

}