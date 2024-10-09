const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  photos: [
    {
      url: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: false, // Make the title field required
      },
    },
  ],
  cover_img: {  // New field for cover image
    type: String,
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
