var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardModel = new Schema({
    currentURN: { type: String },
    title: { type: String },
    vid: {
        type: { type: String },
        src: { type: String },
        border: { type: String },
        width: { type: String },
        height: { type: String },
        frameborder: { type: String },
        allowfullscreen: { type: String }
    },
    topic: { type: String },
    rdfts: [ String  ],
    body: { type: String },
    conclusion: { type: String },
    prevURN: {type: String},
    nextURN: { type: String}
});
module.exports = mongoose.model('Card', cardModel);