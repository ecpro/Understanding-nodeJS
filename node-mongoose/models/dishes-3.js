var mongoose = require('mongoose');

var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

// sub-document schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    });

// parent document Schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: '',

    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},
    {
        timestamps: true
    });

var Dishes = mongoose.model('dish', dishSchema);

module.exports = Dishes;