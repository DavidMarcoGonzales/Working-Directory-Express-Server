var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardModel = new Schema({




    url : { type: String },
    type : { type: String },
    title: { type: String },
    Vid : {
        type : { type: String },
        src : { type: String },
        border : { type: String },
        width : { type: String },
        height : { type: String },
        frameborder : { type: String },
        allowfullscreen : { type: String }
    },
    topic : { type: String },
    reasonDetailfFactTransitions: [
        {
            rdft: { type: String },
            explainations: [
                {
                    explaination: { type: String },
                }
            ]
        },

    ],
    conclusion: { type: String }


});


module.exports = mongoose.model('Card', cardModel);