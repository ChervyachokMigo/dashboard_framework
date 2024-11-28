const { clients_send } = require("../sockets");
const _style = require("../data/style");
const { log } = require("../misc/tools");

module.exports = {
    /**
     * 
     * @param selector element selector for jQuerry
     * @param prop css parametre name
     * @param value value of parametre
     */
    css_apply: async (args) => {
        log('css_apply', args);
        _style.add(args);
        await clients_send('css_apply', args);
    },
}