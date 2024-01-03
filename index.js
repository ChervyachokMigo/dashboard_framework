const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const WEBSERVER_HTTP_PORT = 3131;

module.exports = {
    init: () => {

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(express.static('public'));
    
        app.on('error', (e) => {
            if (e.code === 'EADDRINUSE') {
                console.error('Address in use, retrying...');
            }
        });
    
        /*app.post('/message', (req, res) => {
            console.log(req.body);
            res.send('complete');
        });*/
    
        app.listen(WEBSERVER_HTTP_PORT, ()=>{
            log(`Webserver listening on http://localhost:${WEBSERVER_HTTP_PORT}!`, 'Webserver');
        });
    },
}
