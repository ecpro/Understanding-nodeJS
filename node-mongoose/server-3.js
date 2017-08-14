var Dishes = require('./models/dishes-3');

var assert = require('assert');
var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
    console.log("connected to the server successfully");

    Dishes.create({
        name: "Uthapizza",
        image: "images/uthapizza.png",
        category: "mains",
        label: "Hot",
        price: "4.99",
        description: "A unique . . .",
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in conFusion!",
                author: "John Lemon"
            },
            {
                rating: 4,
                comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                author: "Paul McVites"
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('dish created');
        console.log(dish);

        var id = dish._id;

        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                    new: true
                }).exec(function (err, dish) {
                    if (err) {
                        throw err;
                    }
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        //db.collection('dishes').drop(function () {
                          //  db.close()
                        //});
                        db.close();
                    });
                });
        }, 3000);
    });

});
