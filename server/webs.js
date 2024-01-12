const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('../misc/tools');

const WEBSERVER_PUBLIC_PATH = path.join(__dirname, 'public');

const HTMLMainBody = (SOCKET_PORT) => {
    const html_begin = '<!DOCTYPE html><html lang="ru">';

    const html_head = '<head>' + 
        '<meta charset="utf-8">' + 
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<title>Dashboard</title>' +
        '<link rel="stylesheet" href="styles.css">' +
        '<script src="jquery.min.js"></script>' +
        '<script src="status.js"></script>' +
    '</head>';

    const html_body = '<body>' +
        `<div hidden id="SOCKET_PORT" data="${SOCKET_PORT}"></div>` +
        '<header><h1></h1></header>' +
        '<div class="middle">' +
            '<div class="status"></div>' +
        '</div>' +
        '<div class="bottom">' +
            '<div class="feed"></div>' +
        '</div>' +
    '</body>';

    const html_end = '</html>';

    return `${html_begin}${html_head}${html_body}${html_end}`;
}

module.exports = {
    init_webserver: async (WEB_PORT, SOCKET_PORT) => {
        return new Promise( (res, rej) => {
            let WEB_SERVER = express();
        
            WEB_SERVER.use(bodyParser.json());
            WEB_SERVER.use(bodyParser.urlencoded({ extended: false }));
        
            WEB_SERVER.use(express.static(WEBSERVER_PUBLIC_PATH));
        
            WEB_SERVER.on('error', (e) => {
                if (e.code === 'EADDRINUSE') {
                    console.error('Address in use, retrying...');
                }
                rej(e);
            });
        
            WEB_SERVER.get('/', (req, res) => {
                res.send(HTMLMainBody(SOCKET_PORT));
            });
        
            WEB_SERVER.listen(WEB_PORT, ()=>{
                log(`Webserver listening on\nhttp://localhost:${WEB_PORT}`);
                res (true);
            });
        });
    }
}