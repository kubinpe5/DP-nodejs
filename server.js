var express = require('express');
var app = express();
var axios = require("axios");
var open = require("open");
var bodyParser = require('body-parser');
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();

var requestFlag = 0;
var responseFlag = 0;

var browsers = ["firefox", "chromium", "opera"];

var results = {
	results: [],
	
	getResults: function() {
		var ret = [];
		for( var i = 0; i < this.results.length; i++ ) {
			ret.push(this.results[i]);
		} 
		return ret;
	},

	addResult: function( result, browser ) {
		console.log("Přidávám");
		this.results.push( { 'result': result, 'browser': browser, 'time': new Date() } );
	}
}

function runTest( test ) {
	if ( requestFlag != responseFlag - 1 ) {
		open('http://localhost:3000/tests/' + test, browsers[requestFlag]);
	}
	requestFlag += 1;
}

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

var tests = req.body.tests;
var index = 0;

app.post('/test', function(req, res) {
	for (var i = tests.length - 1; i >= 0; i--) {
		index = i;
		runTest(tests[i].html);
	}
	res.redirect("/");
})

app.post('/results', function(req, res, next) {
	results.addResult(req.body.results.result, req.body.results.result[2]);
	responseFlag += 1;
	console.log("Počet odpovědí: " + responseFlag);
	if (responseFlag < browsers.length) {
		console.log("Redirect to autotest1");
		axios.post('http://localhost:3000/test/' + tests[index].html);
	} else { 
		res.redirect("/status");
	}
});

app.get('/status', function(req, res) {
	res.render("status", {results: results.getResults()});
	console.log(results);
});

app.listen(3000, function () {
  console.log( 'Server has started and is listening on port 3000' );
});