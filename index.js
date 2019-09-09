var express = require('express');
//var bodyParser = require('body-parser');
//var path = require('path');
//var modelTypes = require('./models/modelTypes');
//var cors = require('cors');
//var mongoose = require('mongoose');

//var db = mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.set('port', (process.env.PORT || 3000));
//app.use(cors());
app.use(express.static('build'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//const User = require("./models/userModel");

//Card = require('./models/cardModel');
//const cardRouter = require('./Routes/genericRoute')(Card, modelTypes.cards);
//app.use('/api/Workbook', cardRouter);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});