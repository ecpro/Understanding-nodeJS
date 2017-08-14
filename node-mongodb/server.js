var mongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var dbOperations = require('./dbOperations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';

mongoClient.connect(url, function (err, db) {
    assert.equal(err, null);
    console.log("Connected correctly to server");

    dbOperations.insertDocument(db, { name: "Vadonut", description: "Test" }, "dishes", function (result) {
        console.log(result.ops);

        dbOperations.findDocuments(db, 'dishes', function (docs) {
            console.log(docs);

            dbOperations.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" },
                "dishes", function (result) {
                    console.log(result.result);

                    dbOperations.findDocuments(db, 'dishes', function (docs) {
                        console.log(docs);

                        db.dropCollection('dishes', function (err, result) {
                            assert.equal(err, null);
                            console.log(result);
                            db.close();
                        });
                    });
                });
        });

    });

});