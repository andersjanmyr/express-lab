$(function() {
    var socket = io.connect('http://localhost');
    console.log(socket);
    socket.on('connect', function () {
        console.log('Connected');
    });
});
