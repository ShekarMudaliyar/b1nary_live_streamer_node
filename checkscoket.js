var io = require('socket.io-client');
var socket = io.connect('http://localhost:4000', {
    reconnect: true
});

socket.on('tweet', function (data) {
    console.log(data);
});