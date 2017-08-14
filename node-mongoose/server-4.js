var Leaders = require('./models/leadership');

var assert = require('assert');
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
    console.log("connected to the server successfully");

    Leaders.create({
        name: "Peter Pan",
        image: "images/alberto.png",
        designation: "Chief Epicurious Officer",
        abbr: "CEO",
        description: "Our CEO, Peter, . . ."
    }, function (err, leader) {
        if (err) throw err;
        console.log('leaders created');
        console.log(leader);

        var id = leader._id;

        setTimeout(function () {
            Leaders.findByIdAndUpdate(id, {
                $set: {
                    description: 'Our CEO, Peter, . . . updated'
                }
            }, {
                    new: true
                }).exec(function (err, leader) {
                    if (err) {
                        throw err;
                    }
                    console.log('Updated leader!');
                    console.log(leader);

                    db.close();
                });
        }, 3000);
    });

});
