var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({
  username: {type: String},
  password: {type: String}
});

module.exports = mongoose.model('User', cardModel);