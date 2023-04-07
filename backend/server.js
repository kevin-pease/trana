const express = require('express');
const data = require('./data');
const cors = require('cors');

// Create an express app
const app = express();

// Configure express to automatically decode JSON bodies
app.use(express.json());

app.use(cors({
    origin: '*'
}));

// Make sure tables and initial data exist in the database
data.applySchema();

var router = require('./router.js');
const { response } = require('express');

// This route causes the database to reset to what's in `schema.sql`.
app.put('/reset_database', function(req,rsp) {
	data.dropAllTables();
	data.applySchema();
	console.log("*** Database reset! ***")
	rsp.json({});
});

// The main route uses the `router.js` file
app.use('/', router);

// Return a 404 if none of the above routes matched.
app.use(function(request, response, next) {
	response.status(404).json({error: "Invalid resource"})
});

// Set the default error handler
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Internal server error')
});
  
// Start accepting requests
const listener = app.listen(process.env.PORT || 3000, function () {
	console.log('\x1b[5m❯\x1b[0m Backend for `' + '\x1b[37mträna\x1b[0m'  + '` is listening on port \x1b[37m' + listener.address().port + '\x1b[0m\x1b[5m ❰\x1b[0m');
});
