$(function() {
    var socket = io.connect('http://localhost');
    console.log(socket);
    socket.on('connect', function () {
        console.log('Connected');
    });


    function bookItem(book) {
        return '<li id="book-' + book.id + '">\n' +
            '<div class="title">' + book.title +  '</div>\n' +
            '<div class="title">' + book.author +  '</div>\n' +
            '</li>\n';
    }
});
