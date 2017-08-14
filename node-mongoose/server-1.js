var Dishes = require('./models/dishes-1'),
    assert = require('assert');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new user
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    // save the user
    newDish.save(function(error) {
        if(error) throw error;
        console.log('Dish Created');
        Dishes.find({}, function(error, dishes) {
            if(error) throw error;

            console.log(dishes);
            db.collection('dishes').drop(function() {
                db.close();
            });
        });

    });
})


