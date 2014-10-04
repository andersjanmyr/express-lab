$(function() {
    function bookItem(book) {
        return '<li id="book-' + book.id + '">\n' +
            '<div class="title">' + book.title +  '</div>\n' +
            '<div class="title">' + book.author +  '</div>\n' +
            '</li>\n';
    }

    function show(type, message) {
        $('#message')
            .removeClass('info error')
            .addClass(type)
            .text(message);
        setTimeout(function() { $('#message').removeClass('info error'); }, 4000);
    }

    function showInfo(message) {
        show('info', message);
    }

    function showError(message) {
        show('error', message);
    }

    var socket = io.connect('http://localhost');
    console.log(socket);
    socket.on('connect', function () {
        console.log('Connected');
        showInfo('Connected');
    });

});
