import {decoder} from "./decoder.js";

var client = new WebSocket('ws://localhost:8080/?token=1', 'echo-protocol');
client.binaryType = "arraybuffer";
client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send('{"sender" : "Carl", "receiver" : "all","message" : "HEJ!"}');
            //client.send(number.toString());
            
        }
    }
    sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    var messageHandler = new decoder(e.data,"message");

    messageHandler.onValid(function(object) {
        console.log("Received: '" + object.message + "'");
    });
};

var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);