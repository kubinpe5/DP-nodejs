var express = require('express');
var app = express();
var axios = require("axios");
var open = require("open");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.post('/autotest2', function(req, res) {
	console.log("Post request");
	open('http://localhost:3000/tests/test2.html', 'firefox');
	res.redirect("/");
})

app.post('/results', function(req, res, next) {
	console.log("Posláno na /results");
	//console.log(req.body.results.result);
	var htmlResponse = "";
	for ( var i = 0; i < req.body.results.result.length; i++ ) {
		htmlResponse += "<li>" + req.body.results.result[i] + "</li>";
	}
	res.send(htmlResponse);
	//axios.get('/results');
	//res.send('results ' + req.params.results);
});

app.listen(3000, function () {
  console.log( 'Server has started and is listening on port 3000' );
});