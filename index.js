const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const WebSocket = require('ws');

const isJSON = (str) => {
    try {
        JSON.parse(str.toString());
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    init: (WEB_PORT, SOCKET_PORT) => {
        this.WEB_PORT = WEB_PORT;
        this.SOCKET_PORT = SOCKET_PORT;

        this.socket_server = new WebSocket.WebSocketServer({ port: SOCKET_PORT });
        
        this.socket_server.on('connection', function connection(ws) {
            ws.id = new Date().getTime();
            console.log('new connection, id: ' + ws.id);
            ws.on('error', console.error);
        
            ws.on('close', ()=> {
                console.log('connection closed, id: ' + ws.id);
                for (let i in clients){
                    if (clients[i].id === ws.id){
                        clients.splice(i, 1);
                    }
                }
            });

            ws.on('message', async function message(data) {
                console.log('received: ' + data);
                if (isJSON(data)){
                    var data_json = JSON.parse(data);

                } else {
                    console.error('"data" is not in JSON format!');
                }
            });
        });

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(express.static(path.join(__dirname, 'public')));
    
        this.app.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                console.error('Address in use, retrying...');
            }
        });
    
        /*app.post('/message', (req, res) => {
            console.log(req.body);
            res.send('complete');
        });*/
    
        this.app.listen(WEB_PORT, ()=>{
            console.log(`Webserver listening on\nhttp://localhost:${WEB_PORT}`);
        });
    },
}
