#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var DATA_SIZE = Math.pow(2, 11); // 2 KB
var STEP = Math.pow(2, 11); // 2 KB
var LIMIT = Math.pow(2, 20); // 1 MB

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
        } else if (message.type === 'binary') {
			console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
		}
    });

	var size = DATA_SIZE;

    function sendNumber() {
        if (connection.connected) {
			var dataArray = new Buffer(size);

			connection.sendBytes(dataArray);
            setTimeout(sendNumber, 1000);

			if (size + STEP <= LIMIT)
				size += STEP;
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');
