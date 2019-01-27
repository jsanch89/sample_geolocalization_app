const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Location', locationSchema);