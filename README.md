# Express Lab

A lab for learning how to create a JSON API with Express.

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
> mocha test/**


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

Put it in `lib/model/book.js`. Return the list from a `find`-function.

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

Don't forget to create test too. Put it in `test/model/book-test.js`.


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


### 14. Optional! Deploy the application to Heroku

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
var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true});

app.set('db', db);
```

### 3. Create `lib/model/book-mongo.js`

The model should take the database as a parameter.

```
//As a class
function BookMongo(db) {
  this.db = db;
}

BookMongo.prototype.find = function find(filter) {
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

function find(filter) {
...
}

module.exports = BookMongo;
```

### 4. Make all the tests pass with a real DB.

Copy `test/model/book-test.js` to `test/model/book-mongo-test.js`
and change it to test `book-mongo` instead.
