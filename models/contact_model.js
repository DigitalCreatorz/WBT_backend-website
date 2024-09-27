const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
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
    note:{
        type:String,
        required:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const contact = mongoose.model("webcontact", contactSchema);

module.exports = contact;

