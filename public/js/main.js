$(function() {
    function bookItem(book) {
        return '<li id="book-' + book.id + '" class="book">\n' +
            '<div class="title">' + book.title +  '</div>\n' +
            '<div class="author">' + book.author +  '</div>\n' +
            '<a href="#" class="delete">Delete</a>\n' +
            '</li>\n';
    }

    $('#books').on('click', '.delete', function(event) {
        event.preventDefault();
        var id = $(this).parent('.book').attr('id').replace('book-', '');
        $.ajax({
            type: 'DELETE',
            url: '/books/' + id
        });
    });

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

    socket.on('book:error', function(error) {
        console.log(error);
        showError('Book ' + error);
    });

    socket.on('book:added', function(b) {
        console.log(event, b);
        $('#books').append(bookItem(b));
        showInfo('Book added ' + b.title);
    });

    socket.on('book:removed', function(b) {
        console.log(b);
        $('#book-' +b.id).remove();
        showInfo('Book added ' + b.title);
    });

    socket.on('book:updated', function(b) {
        console.log(event, b);
        $('#book-' +b.id).replaceWith(bookItem(b));
        showInfo('Book removed ' + b.title);
    });

});
