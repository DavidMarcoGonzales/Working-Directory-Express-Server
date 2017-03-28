var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardModel = new Schema({
    url: { type: String },
    type: { type: String },
    title: { type: String },
    Vid: {
        type: { type: String },
        src: { type: String },
        border: { type: String },
        width: { type: String },
        height: { type: String },
        frameborder: { type: String },
        allowfullscreen: { type: String }
    },
    rdft1: { type: String },
    rdft2: { type: String },
    rdft3: { type: String },
    explaination1: { type: String },
    explaination2: { type: String },
    explaination3: { type: String },
    explaination4: { type: String },
    explaination5: { type: String },
    explaination6: { type: String },
    explaination7: { type: String },
    explaination8: { type: String },
    explaination9: { type: String },
    conclusion: { type: String }
});


module.exports = mongoose.model('Card', cardModel);