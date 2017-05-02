var express = require('express');
var app = express();
var axios = require("axios");
var open = require("open");
var bodyParser = require('body-parser');
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();

var results = {
	results: [],
	maxResultsCount: 20,

	deleteOldResults: function() {
		var oldResultsCount = this.results.length - this.results.maxResultsCount;
		for( var i = 0; i < oldResultsCount; i++ ) {
			this.messages.splice(i, 1);
		}
	},

	getResults: function() {
		this.deleteOldResults();
		var ret = [];
		for( var i = 0; i < this.results.length; i++ ) {
			ret.push(this.results[i]);
		} 
		return ret;
	},

	addResult: function( result, browser ) {
		this.results.push( { 'result': result, 'browser': browser, 'time': new Date() } );
	}
}

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.post('/autotest2', function(req, res) {
	console.log("Post request");
	open('http://localhost:3000/tests/test2.html', 'firefox');
	res.redirect("/");
})

app.post('/results', function(req, res, next) {
	res.render("index", { results: req.body.results.result });
	results.addResult(req.body.results.result, 'firefox');
	console.log(req.body.results.result);
});

app.get('/status', function(req, res) {
	res.render("status", {results: results.getResults()});
	console.log(results);
});

app.listen(3000, function () {
  console.log( 'Server has started and is listening on port 3000' );
});