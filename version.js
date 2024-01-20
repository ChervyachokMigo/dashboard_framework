const { readFileSync, writeFileSync } = require("fs-extra");
const package = 'package.json';
const encoding = {encoding: 'utf8'};
const version_inc = () => {
    try {
        let data = JSON.parse(readFileSync(package, encoding));
        if (data && data.version) {
            console.log('old version: ', data.version);
            data.version = (Number(data.version.replace(/[.]+/gui, '')) + 1).toString().split('').join('.');
            console.log('new version: ', data.version);
            writeFileSync(package, JSON.stringify(data), encoding);
            console.log('saved.');
        }
    } catch (e) {
        console.error(e);
    }
}

version_inc();