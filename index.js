var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var modelTypes = require('./models/modelTypes');
var cors = require('cors');
var mongoose = require('mongoose');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


var db = mongoose.connect(process.env.MONGODB_URI);

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressJWT({ secret: 'I love domestic longhaired cats the most' }).unless({ path: ["/login"] }));

const User = require("./models/userModel");

app.post('/login', function (req, res) {

    if (!req.body.username) {
        res.status(400).send('username required');
        return;
    }
    if (!req.body.password) {
        res.status(400).send('password required');
        return;
    }
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) throw err;
        if (user.password === req.body.password) {
            const myToken = jwt.sign({ _id: user._id }, 'I love domestic longhaired cats the most', { expiresIn: '1h' })
            res.status(200).json(myToken);
        }
        else {
            res.status(401).send("Invalid Password")
        }
    });
});

const Card = require('./models/cardModel');
const cardRouter = require('./Routes/genericRoute')(Card, modelTypes.cards);
app.use('/api/Workbook', cardRouter);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});