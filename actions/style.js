const { clients_send } = require("../server/sockets");
const _style = require("../server/data/style");

module.exports = {
    css_apply: (args) => {
        console.log('css_apply', args);
        _style.add(args);
        clients_send('css_apply', args);
    },
}