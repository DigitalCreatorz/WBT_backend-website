const mongoose = require('mongoose');


const attractionsSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true, 
      },
      city: {
        type: String,
        required: true, 
      },
      title: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true, 
      },
      description: {
        type: String,
        required: true, 
      },
      photoPath: {
        type: String,
        default: null,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
});

const destination = mongoose.model("attractions", attractionsSchema);

module.exports = destination;

