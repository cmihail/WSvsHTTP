#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var LIMIT = 50;
var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket client connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
			if (step == LIMIT)
				connection.close();
        }
    });

    var step = 1;

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());

            if (step < LIMIT) {
                setTimeout(sendNumber, 1000);
                step++;
            }
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');

