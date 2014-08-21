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

```
# Verify that everything is working
$ npm test

# Start a test watcher
$ npm run test-watch

# Start a server
$ npm start

# Start a server with file watching
$ npm run watch
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
server down it should be running all time.

### 2. Start a test watcher

The test watcher should also be running all the time. Modify the tests to
verify that they fail if the expectations are changed. Fix them again.


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

### 4. Create a new route, `lib/routes/books`

Also create the accompanying test, `test/routes/books-test.js`. The server
should serve the list of books on `/books`.

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
}
```

### 6. Extract the book model

Put it in `lib/model/book.js`. Return the list from a `find`-function.

### 7. Add a method for getting a book by id

Call the function `findById(id)`. Get the book from the array.

### 8. Add a route for getting a book by id in `lib/routes/books`

Also add the accompanying test in `test/routes/books-test.js`. The server
should serve the list of books on `/books/:id`. The path parameter can be
accessed via `req.params('id')` corresponding to the value after the colon.




