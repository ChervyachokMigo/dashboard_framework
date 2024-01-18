const { log } = require("../misc/tools");
const { set_notifies, get_notifies } = require("../server/data/notify");
const { clients_send } = require("../server/sockets");

module.exports = {
    /**
     * @param folder_path
     * @param sounds
     * @property name
     * @property file
     */
    set_notifies: async (args) => {
        log('set_notifies', args);
        const notifies = set_notifies(args)
        if (notifies && notifies.length > 0){
            await clients_send('set_notifies', { list: notifies } );
        }
    },
}