var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var modelTypes = require('./models/modelTypes');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connect(process.env.mongodb_books);

var app = express();

app.use(cors());
app.set('port', (process.env.PORT || 3000));

app.use(express.static('build'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to my API, said Dave');
});

var Book = require('./models/bookModel');
var bookRouter = require('./Routes/genericRoute')(Book, modelTypes.books);
var Card = require('./models/cardModel');
var cardRouter = require('./Routes/genericRoute')(Card, modelTypes.cards);

app.use('/api/books', bookRouter);
app.use('/api/cards', cardRouter);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


