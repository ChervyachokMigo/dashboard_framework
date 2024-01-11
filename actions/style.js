// @ts-ignore

const { clients_send } = require("../server/sockets");
const _style = require("../server/data/style");
const { log } = require("../misc/tools");

module.exports = {
    css_apply: (args) => {
        log('css_apply', args);
        _style.add(args);
        clients_send('css_apply', args);
    },
}