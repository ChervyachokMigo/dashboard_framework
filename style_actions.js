const { clients_send } = require("./socketserver");
const _style = require("./style");

module.exports = {
    css_apply: (args) => {
        console.log('css_apply', args);
        _style.add(args);
        clients_send('css_apply', args);
    },
}