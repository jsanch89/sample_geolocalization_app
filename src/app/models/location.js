const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model('Location', locationSchema);