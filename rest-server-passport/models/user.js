var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    'username': String,
    'password': String,
    'OauthId': String,
    'OauthToken': String,

    'firstname': {
        type: String,
        default: ''
    },
    'lastname': {
        type: String,
        default: ''
    },
    'admin': {
        type: Boolean,
        default: false
    },
});

User.plugin(passportLocalMongoose);

User.methods.getName = function () {
    return this.username + ' ' + this.password;
}

module.exports = mongoose.model('User', User);