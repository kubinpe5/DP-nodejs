var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

// Serve up public/ftp folder
var serve = serveStatic('./', {'index': 'index.html'});

// Create server
var server = http.createServer(function (req, res) {
	if (req.url.match("^/test1"))
	serve(req, res, finalhandler(req, res));
});

// Listen
server.listen(3000, function() {
    console.log( 'Server has started and is listening on port 3000' );
});
