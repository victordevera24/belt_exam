var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var session = require('session');

var app = express();

app.set('view enigine', 'ejs');
app.set('views', path.join(__dirname + './views'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'))

mongoose.connect('mongodb://localhost/belt_exam');
mongoose.Promise = global.Promise; 

//////schema goes here

app.listen(8000, function() {
    console.log('running this express project on port 8000')
})