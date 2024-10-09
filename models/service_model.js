const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const service = mongoose.model("webservices", serviceSchema);

module.exports = service;

