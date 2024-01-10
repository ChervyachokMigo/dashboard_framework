const settings = require("./settings");

module.exports = {
    isJSON: (str) => {
        try {
            JSON.parse(str.toString());
        } catch (e) {
            return false;
        }
        return true;
    },

    log: (...args) => {
        if (settings.get('debug')){
            console.log(...args);
        }
        
    },
}