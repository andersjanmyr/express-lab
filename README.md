# Express Lab

A lab for learning how to create a JSON API with Express. In the lab you will
learn how to:

* Setup a Node environment for fast development, debugging and testing.
* Structure your code in separate modules
* Create an JSON API with `Express`
* Write tests for the API, with `Mocha`, `Supertest`, `Sinon.js` and `Chai`
* Write Express middleware
* Deploy the application to the Heroku cloud service
* Save data into Mongo DB.
* Implement event notifications with an `EventEmitter`
* Use web-sockets to send event to the server with `Socket.IO`
* Write a single page web application, SPA, to communicate with the service via
  REST and web-sockets



## Installation

* [Install Node](http://nodejs.org/)

```
# Install dependencies
$ npm install
...
```

## Running


### Verify that everything is working

```
$ npm test

> express-lab@0.1.0 test /Users/andersjanmyr/Projects/express-lab
> mocha --recursive


  GET /status
    ✓ responds with health good

  sanity
    ✓ verifies the test setup
    ✓ verifies the test setup (async) (202ms)

  3 passing (240ms)
```

### Start a test watcher

```
$ npm run test-watch
...
```

### Start a server

```
$ npm start

> express-lab@0.1.0 start /Users/andersjanmyr/Projects/express-lab
> node server.js

DEVELOPMENT server started
Port: 3000
URL: http://localhost:3000
```

If you want to start a sever on a different port or in production mode, you can
do this by setting environment variables or adding them on command line.

```
$ NODE_ENV=production PORT=8080 npm start

> express-lab@0.1.0 start /Users/andersjanmyr/Projects/express-lab
> node server.js

PRODUCTION server started
Port: 8080
URL: http://localhost:8080
```

### Start a server with file watching

```
$ npm run watch
```

### Debugging

Debugging the code can be done with the help of `node-inspector`. This allows
you to debug the code with the Chrome developer tools.

```
$ npm install -g node-inspector # Install node-inspector globally

$ node-inspector & # Start the inspector (&) in the background
Node Inspector v0.7.4
Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.

$ npm run debug # Start debugging the server

$ npm run test-debug # Start debugging the tests
```

Open the link that is output by `node-inspector` in Chrome to debug.


### Curl

Curl is the web developer's best friend. It can be used to GET, POST, PUT, and
DELETE resources. Here are some examples that will help you out.

```
# Examples

# GET all books
$ curl http://localhost:3000/books


# GET single book
$ curl http://localhost:3000/books/geb

# POST book, remember Content-Type
curl -H "Content-Type: application/json" -d '{"title":"Anti Fragile","author":"Nassim Taleb"}' http://localhost:3000/books


# PUT book, remember Content-Type
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Anti Fragile","author":"Nassim Taleb"}' http://localhost:3000/books/anf

# DELETE book
curl -X DELETE http://localhost:3000/books/anf
```



## Lab Instructions

The lab structure looks like below.

```
$ tree .
express-lab
|-- lib
|   |-- app.js             # The express application for middleware and routes
|   `-- routes             # Directory to put the routes in
|       `-- status.js      # A route for serving status
|-- node_modules           # Directory for module dependencies
|-- package.json           # Module information, dependencies and scripts
|-- README.md
|-- server.js              # Sets up and starts the http server
`-- test
    |-- routes
    |   `-- status-test.js # Routing test with supertest, mocha and chai
    `-- sanity-test.js     # Mocha test with chai assertions
```


### 1. Start the server in `watch` mode and verify that status works

Verify by browsing to the URL that is output by the server. Don't shut the
server down it should be running all time. *When new files are added, the
watcher needs to be restarted*

### 2. Start a test watcher

The test watcher should also be running all the time. Modify the tests to
verify that they fail if the expectations are changed. Fix them again.
 *When new files are added, the watcher needs to be restarted*

### 3. Install and configure middleware for logging

```
# Install morgan and add it to package.json
$ npm install morgan --save
```

Configure it for dev mode by adding it to `lib/app.js`

```
var morgan = require('morgan');
...
app.use(morgan('dev'));
```

### 4. Create a new route, `lib/routes/books.js`

Also create the accompanying test, `test/routes/books-test.js`. The server
should serve the list of books on `/books`. *When new files are added, the
watcher needs to be restarted*

### 5. Implement the test and the service for getting all books

The server should respond with a list of books in JSON-format. Start by
implementing the test. Copy the status test if you need a start.

```
// Example books
[{
  id: 'geb',
  title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
  author: 'Douglas Hofstadter'
},
{
  id: 'bof',
  title: 'The Beginning of Infinity, Explanations That Transform the World',
  author: 'David Deutsch'
},
{
  id: 'zam',
  title: 'Zen and the Art of Motorcycle Maintenance',
  author: 'Robert Pirsig'
},
{
  id: 'fbr',
  title: 'Fooled by Randomness',
  author: 'Nicholas Taleb'
}]
```

### 6. Extract the book model

Put it in `lib/models/book.js`. Return the list from a `find`-function.

Example:
```
var books = [books...]

function find() {
  return books;
}

module.exports = {
  find: find
};
```

Don't forget to create test too. Put it in `test/models/book-test.js`.


### 7. Add a method for getting a book by id

Call the function `findById(id)`. Get the book from the array.

### 8. Add a route for getting a book by id in `lib/routes/books.js`

Also add the accompanying test in `test/routes/books-test.js`. The server
should serve the list of books on `/books/:id`. The path parameter can be
accessed via `req.params('id')` corresponding to the value after the colon.

### 9. Add filtering to getting all books

It should be possible to free text filter in title and author.

* Add test for filtering to model test.
* Alter the `find` method in the model to pass the test.
* Add a test to the route-test to handle filtering.
* Change the route that gets all the books to support a filter. The route
  `/books?filter=the` should return 2 books.

Use `req.param('filter')` to get the filter query parameter value.

### 10. Add support for `DELETE /books/:id`

This deletes the book from the in memory collection.


### 11. Add support for `PUT /books/:id`

This updates the book from the in memory collection.  You may need to add
the `body-parser` middleware for this` `npm install body-parser --save`.

```
var bodyParser = require('body-parser');

app.use(bodyParser.json();
```

*Add the `body-parser`-middleware before you your routes. Middleware is added
to a list and is traversed in the order it is added.


### 12. Add support for `POST /books`

This adds a new book to the collection. Generate an id from the title of the
book.

### 13. Change the model to async mode.

Change all the model function to async instead and change the tests and the
calls to them

```
// Change from sync
function find(filter) {
  ...
  return books;
}

// Sync call
res.send(books.find(filter));


// To async
function find(filter, callback) {
  ...
  // Call the callback on next iteration with this=null, err=null, data=books
  process.nextTick(callback.bind(null, null, books));
}

// Async call
books.find(filter, function(err, data) {
  res.send(data);
});
```

### 14. Middleware CORS

Browsers are prevented from making ajax calls to other servers than their
origin. This is a security constraint that is implemented in the browsers.
[Cross Origin Resource Sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing),
CORS, is a mechanism in which the server that is called allows the browser to make
requests to it from a different host.

CORS is implemented by sending an additional header `Access-Control-Allow-Origin`
with the response to a resource. This informs the browser that it can make ajax
requestst to it. We are going to implement this functionality is Express
*middleware*.

```javascript
// Middleware example
function middleware(req, res, next) {
    // Middleware can:
    // Do something with request, then call next()
    // Do Something with response, then call next()
    // Send a response, short-circuiting the stack, don't call next
};
```

Add a test that verifies that the `Access-Control-Allow-Origin` header with
the value `\*` is added to the response. The test should be modelled after the
route tests but should `app.use(middleware)` instead.

Implement the function called `corsMiddleware` that adds fulfills the above
test. Don't forget to call `next()`.  Adding a header is done with
`res.header(name, value)`.

When this is done add the middleware to the stack in `app.js` with
`app.use(middleware)`


### 15. Optional! Deploy the application to Heroku

If you want to you may deploy your application to Heroku. Follow their
[instructions for getting started](https://devcenter.heroku.com/articles/getting-started-with-nodejs).



## Mongo DB

Now the first part of the lab is done. Now it is time to add some persistence
to the model, we do this with `mongoskin`

### Install Mongo DB

Follow the [installations instructions](http://docs.mongodb.org/manual/installation/) if you don't already have it.

Make sure `mongo` is started!

### 1. Install mongoskin

```
$ npm install mongoskin --save
```

### 2. Connect to a DB with mongoskin

```
// In server.js start() method
var db = mongoskin.db('mongodb://@localhost:27017/express-lab-test', {safe:true});

app.set('db', db);
```

### 3. Create `lib/models/book-mongo.js`

The model should take the database as a parameter.

```
//As a class
function BookMongo(db) {
  this.db = db;
}

BookMongo.prototype.find = function find(filter, callback) {
}
...

module.exports = BookMongo;
```
Or,
```
// As a function that returns an object
var db;
function bookMongo(database) {
  db = database;
  return {
    find: find,
    ...
  }
}

function find(filter, callback) {
...
}

module.exports = BookMongo;
```

### 4. Make all the tests pass with a real DB.

Copy `test/models/book-test.js` to `test/models/book-mongo-test.js`
and change it to test `book-mongo` instead.

Here are a couple of skeleton files to get going
```js
// test/models/book-mongo-test.js
'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var mongoskin = require('mongoskin');

var MongoBook = require('../../lib/models/mongo-book');

var db = mongoskin.db('mongodb://@localhost:27017/express-lab-test', {safe:true});

// Example books
var seed = [{
    title: 'Gödel, Escher, Bach: an Eternal Golden Braid',
    author: 'Douglas Hofstadter'
},
{
    title: 'The Beginning of Infinity, Explanations That Transform the World',
    author: 'David Deutsch'
},
{
    title: 'Zen and the Art of Motorcycle Maintenance',
    author: 'Robert Pirsig'
},
{
    title: 'Fooled by Randomness',
    author: 'Nicholas Taleb'
}];

// I allow the constructor to take a seed to simplify testing.
var book = new MongoBook(db, seed);

describe('mongo-book', function() {

    before(function(done) {
        book.reset(done);
    });

    describe('#find', function() {
        it('finds the matching books', function(done) {
            book.find('the', function(err, books) {
                expect(books.length).to.equal(2);
                expect(books[0].title).to.match(/the/);
                done();
            });
        });
    });
});
```

```javascript
// lib/models/mongo-book.js
'use strict';
var debug = require('debug')('express-lab:mongo-book');


function MongoBook(db, seed) {
    this.db = db;
    this.books = db.collection('books');
    this.seed = seed;
}

MongoBook.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {author: { $regex: filter, $options: 'i'}},
            {title: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.books.find(query).toArray(function(err, books) {
        callback(err, books);
    });
};

MongoBook.prototype.reset = function(callback) {
    var books = this.books;
    var seed = this.seed;
    books.drop(function(err, data) {
        books.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = MongoBook;
```

### 4. Add the MongoBook to the server

* Change `book-router` to take a book model as a parameter.
* Verify that the tests still run.
* Change `app.js` to initiate Mongo and replace the `book`-model with
  `mongo-book` model.
* Verify that the tests run.
* Verify that the server works.


## WebSockets with Socket.IO

### 1. Check out the branch called `websockets`.

Then install new dependencies with `npm`, start the server in DEBUG watch mode and
check out the new [root page](http://localhost:3000).

```
$ git checkout websockets
$ npm install
$ DEBUG=express-lab:* npm run watch
$ open http://localhost:3000
```

### 2. Familiarize yourself with the files

* `lib/app.js` - Uses `express.static` to serve static files from `public`.
* `public/index.html` - A basic HTML page with three scripts, `jquery`,
  `socket.io`, and `main.js`.
* `server.js` - Hooks up socket.io to the existing connection.
* `public/js/main.js` -  The client side Javascript, starts a websocket connection.

Open a console in the browser and verify that a websocket connection is
established with the server. You should see something like this:

```
Socket {io: Manager, nsp: "/", json: Socket, ids: 0, acks: Object…}
Connected
```

### 3. Detect the connection on the server side

In `app.js` is a function called `setupWebsockets(io)`. Setup a listener for
detecting the connection attempt by the client.

```
// Listen to connection events
io.on('connection', function(socket) {
    debug('Connection established);
});
```

Make sure the connection is detected by checking out the log.

### 4. Send an event to the client with socke.emit

This event must by sent from inside the connection callback, since this is
where the socket is available.

```
// Send an event
socket.emit('testEvent', {tapir: 'are cool!'});
```

### 5. Listen to the event on the client.

Modify `public/js/main.js` to listen to the `testEvent`. Log to the console or
use the provided function `showInfo` to display the event.

```
socket.on('testEvent', function () {
    console.log('Connected');
});
```

### 6. Change `Book` into an EventEmitter

```
var EventEmitter = require("events").EventEmitter;
var util = require('util');

function Book() {
  // Call the EventEmitter constructor
  EventEmitter.call(this);
...
}
// Set EventEmitter as Book's prototype
util.inherits(Book, EventEmitter);
```

Add a test to verify that you can call `on` and `emit` on a book object.


### 7. Change the method in Book to emit events

You emit events with the `emit` function. Set up the following events:

```
// Emit the following events in the appropriate methods.
this.emit('added', book);
this.emit('removed', book);
this.emit('updated', book);
this.emit('error', error);
```

### 8. Listen to the Book events

Set up listeners in `app.js` to listen to the book events and log them with
`debug`. You listen with the `on` function.


```
book.on('added', function(book) {
    debug('added', book);
});
...
```

Or you can setup all the listeners in a loop.

```
['added', 'removed', 'updated', 'error'].forEach(function(name) {
  ...
});
```

### 9. Send the events on to the client

Send on the events to the client. Namespace the events with `book:`, to make it
easy for the client to separate events from different models.

```
book.on('added', function(book) {
    debug('added', book);
    socket.emit('book:added', book);
});
```


### 10. Listen to the events and add the new books to the #books `ul`

Use the existing function `bookItem` to create the HTML to insert.

```
socket.on('book:added', function (book) {
    console.log('book:added', book);
    $('#books').append(bookItem(book));
    showInfo('Book added ' + book.title);
});
```


### 11. Handle the rest of the events as appropriate.

Use jQuery to update the list and give feedback with `showInfo`, and `showError`.

```
socket.on('book:removed', function(book) {
    console.log('book:removed', book);
    $('#book' + book.id).remove();
});

socket.on('book:updated', function(book) {
    console.log('book:updated', book);
    $('#book' + book.id).replaceWith(bookItem(book));
});

socket.on('book:error', function(error) {
    console.log('book:error', error);
});
```

### 12. Add client side functionality.

* Add a form to `public/index.html` to allow you add new books.
* Add Delete buttons to every book item to allow you to delete.
* Add Edit button to every book item to populate the form.

Useful `jQuery` methods are `ajax` and 'click`.
