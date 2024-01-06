const { clients_send } = require("./socketserver");
const { change_status_by_name, change_status_text_by_name, change_status_item_text_by_name, compare_current_status } = require("./status");

module.exports = {

    change_status: (name, status) => {

        console.log('change_status', {name, status} );

        change_status_by_name(name, status);

        clients_send('change_status', {name, status});

    },

    change_text_item: (name, item_name, text) => {

        console.log('change_text_item', {name, text} );

        change_status_item_text_by_name (name, item_name, text);
        
        if (compare_current_status(name, item_name)) {
            clients_send('change_text_item', {name, item_name, text});
        }

    },

    change_status_text: (name, text) => {

        console.log('change_status_text', {name, text} );

        change_status_text_by_name(name, text);

        clients_send('change_status_text', {name, text});

    },
}