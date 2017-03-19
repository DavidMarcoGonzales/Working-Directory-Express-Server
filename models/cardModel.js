var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardModel = new Schema({
    title: {type: String},
    question: {type: String},
    answers: [{type: String}],
    conclusion: {type: String}
});

module.exports = mongoose.model('Card', cardModel);