const path = require('node:path');
const cors = require('cors')
const permissions_policy = require("permissions-policy");

const express = require('express');
const bodyParser = require('body-parser');
const { log } = require('./misc/tools');

const WEBSERVER_PUBLIC_PATH = path.join(__dirname, 'public');

const HTMLMainBody = (SOCKET_PORT) => {
    const html_begin = '<!DOCTYPE html><html lang="ru">';

    const html_head = '<head>' + 
        '<meta charset="utf-8">' + 
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<title>Dashboard</title>' +
        '<link rel="stylesheet" href="styles.css">' +
        '<script src="jquery.min.js"></script>' +
    '</head>';

    const html_body = '<body>' +
        `<div hidden id="SOCKET_PORT" data="${SOCKET_PORT}"></div>` +
        '<div class="middle">' +
            '<div class="status"></div>' +
			'<div class="progress"></div>'+
        '</div>' +
        '<div class="bottom">' +
            '<div class="feed"></div>' +
        '</div>' +
        '<div class="overflow">' +
            '<div class="fullscreen">' +
                '<img src="images/fullscreen.png">' +
            '</div>' +
            '<div class="mute">' +
                '<img src="images/unmute.png">' +
            '</div>' +
        '</div>'
    '</body>';

    const sctipt = '<script src="scripts_init.js"></script>';

    const html_end = '</html>';

    return `${html_begin}${html_head}${html_body}${sctipt}${html_end}`;
}

let WEB_SERVER = null;

module.exports = {
    init_webserver: async (WEB_PORT, SOCKET_PORT) => {
        return new Promise( (res, rej) => {
            WEB_SERVER = express();
            WEB_SERVER.use(cors());
            WEB_SERVER.use(bodyParser.json());
            WEB_SERVER.use(bodyParser.urlencoded({ extended: false }));
            WEB_SERVER.use(permissions_policy({
                features: {
                    fullscreen: ["self"],
                    autoplay: ["self"]
                }
            }));
        
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
                res (WEB_SERVER);
            });

        });
    },

	// destroy_webserver: async () => {
	// 	console.log('Closing webserver');
	// 	return await new Promise ( res => {
	// 		LISTENER.closeAllConnections();
	// 		setInterval( () => {
	// 			let result = LISTENER.emit('close');
	// 			if (result) {
	// 				res(true)
	// 			} else {
	// 				console.log('Webserver cant closed');
                    
	// 			}
	// 		}, 1000);
			
	// 	});
	// }
}