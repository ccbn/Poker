#!/usr/bin/env node
var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
        if(message.type == "binary") {
            console.log("Received: '" + message.binaryData + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            //connection.sendUTF(number.toString());
            const buffer = Buffer.alloc(2);
            buffer[0] = 100;
            connection.sendBytes(buffer);
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('ws://localhost:8080/', 'echo-protocol');