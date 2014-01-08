#!/usr/bin/env node

require('look').start();

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});

console.log((new Date()) + ' Server is listening on port 8080');

wss.on('connection', function(ws) {
    console.log((new Date()) + ' Connection accepted.');

    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send(message);

//        console.log('received: %i', message.length);
//        ws.send(message, {binary: true, mask: true});
    });

    ws.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

