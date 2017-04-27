var http = require("http");
var express = require('express');

var app = express();

app.get('/index.html', function (req, res) {
  console.log('Time:', Date.now());
  res.sendFile("/index.html", {root: __dirname });
});

app.get('/test2/test2.html', function (req, res) {
  console.log('Time:', Date.now());
  next();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});