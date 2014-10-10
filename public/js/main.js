$(function() {
    function bookItem(book) {
        return '<li id="book-' + book.id + '" class="book">\n' +
            '<div class="title">' + book.title +  '</div>\n' +
            '<div class="author">' + book.author +  '</div>\n' +
            '<a href="#" class="delete">Delete</a>\n' +
            '<a href="#" class="edit">Edit</a>\n' +
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

    $('#books').on('click', '.edit', function(event) {
        event.preventDefault();
        var $book = $(this).parent('.book');
        $book.addClass('editing');
        var id = $book.attr('id').replace('book-', '');
        var title = $book.find('.title').text();
        var author = $book.find('.author').text();
        console.log(id, title, author);
        $('#form-id').val(id);
        $('#form-title').val(title);
        $('#form-author').val(author);
        $('#form-submit').val('Update book');
    });

    $('#form-clear').click(function(event) {
        event.preventDefault();
        reset();
    });

    function reset() {
        $('.book').removeClass('editing');
        $('#form')[0].reset();
        $('#form-id').val('');
        $('#form-submit').val('Add book');
    }

    $('#form').submit(function(event) {
        event.preventDefault();
        var data = {};
        $(this).serializeArray().forEach(function(entry) {
            data[entry.name] = entry.value;
        });
        var promise = $.ajax({
            type: data.id ? 'PUT' : 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: data.id ? '/books/' + data.id : '/books',
            data: JSON.stringify(data),
            success: reset
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
        showInfo('Book updated ' + b.title);
    });

});
