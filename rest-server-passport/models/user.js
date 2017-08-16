var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    'username': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true,
    },
    'admin': {
        type: boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);