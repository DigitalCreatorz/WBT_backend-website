const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    destination: [{
        type: String,
        required: true,
    }],
    tentative_month:{
        type: String,
        required: true,
    },
    note:{
        type:String,
        required:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const inquiry = mongoose.model("webinquiries", userSchema);

module.exports = inquiry;

