let _styles = [];

module.exports = {
    get_list: () => {
        return _styles;
    },

    add: (args) => {
        _styles.push(args);
    },

}