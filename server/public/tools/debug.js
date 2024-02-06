const log = (...args) => {
    if (get_setting('debug')){
        console.log(...args);
    }
}