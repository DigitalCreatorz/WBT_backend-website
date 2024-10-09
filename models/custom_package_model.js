const mongoose = require('mongoose');

const custom_packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: false,
    },
    destination:
    {
        type: String,
        required: true,
    },
    noofnight: {
        type: String,
        required: true,
    },
    attraction:[ {
        type: String,
        required: true,
    }],
    hotel_rating: {
        type: String,
        required: true,
    },
    include_flight: {
        type: Boolean,
        required: true,
    },
    include_visa: {
        type: Boolean,
        required: true,
    },
    include_extrasevice: {
        type: String,
        required: false,
    }
}
);

const custom_package = mongoose.model("custom_package", custom_packageSchema);

module.exports = custom_package;
