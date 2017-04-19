var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var modelTypes = require('./models/modelTypes');
//var cors = require('cors');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


var db = mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.set('port', (process.env.PORT || 3000));
//app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(expressJWT({secret:'I love domestic longhaired cats the most'}).unless({path:['/login','/api/Workbook','/api/Situational_Awareness']}))
console.log("using 3000");

// app.post('/login', function(req,res){
//     if(!req.body.username){
//         res.status(400).send('username required');
//         return;
//     }
//     if (!req.body.password){
//         res.status(400).send('password required');
//     }
//     User.
// })




var Card = require('./models/cardModel');
var cardRouter = require('./Routes/genericRoute')(Card, modelTypes.cards);
app.use('/api/Workbook', cardRouter);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});