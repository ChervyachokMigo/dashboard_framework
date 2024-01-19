let _styles = [];

module.exports = {
    get_list: () => {
        return _styles;
    },

    add: ({selector, prop, value}) => {
        const i = _styles.findIndex(v => v.selector === selector && v.prop === prop );
        if (i > -1){
            _styles[i].value = value;
        } else {
            _styles.push({selector, prop, value});
        }
    },

}