let _styles = [];

module.exports = {
    get_list: () => {
        return _styles;
    },

    add: (args) => {
        const i = _styles.findIndex(v => v.selector === args.selector && v.prop === args.prop );
        if (i > -1){
            _styles[i].value = args.value;
        } else {
            _styles.push(args);
        }
    },

}