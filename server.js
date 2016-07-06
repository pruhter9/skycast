// Require necessary modules
var express		= require('express'),
 	path 		= require('path'),
	bodyParser 	= require('body-parser');

// Create the express app
var app = express();
app.use(bodyParser.json());

// Set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// Include mongoose and RESTful routes
// require('./config/mongoose.js');
require('./config/routes.js')(app);

// Open port 8001 to HTTP communication on the Node server
app.listen(8001, function() {
	console.log('App running on port 8001');
});