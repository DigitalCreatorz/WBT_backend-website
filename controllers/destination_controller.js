// Import the Mongoose model
const DestinationModel = require('../models/destination_model'); // Renamed from 'city' to 'DestinationModel'

// Get all cities (generic)
const get_city = async (req, res) => {
  try {
    const response = await DestinationModel.find();
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get unique countries
const get_uniqueCountry = async (req, res) => {
  try {
    const uniqueCountries = await DestinationModel.distinct('country');
    res.status(200).json({ message: uniqueCountries });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get unique cities
const get_uniqueCity = async (req, res) => {
  try {
    const uniqueCities = await DestinationModel.distinct('city');
    res.status(200).json({ message: uniqueCities });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get destinations (attractions) by city name
const get_destinationBycity = async (req, res) => {
  const { city } = req.params; // Destructure city from req.params

  try {
    // Use the Mongoose model (DestinationModel) to find all attractions for the given city
    const attractions = await DestinationModel.find({ city: city, isDeleted: false });

    res.status(200).json({ message: attractions.map(attraction => attraction.name) }); // Returning only attraction names
  } catch (error) {
    console.error('Error fetching attractions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export all the controller functions
module.exports = { get_city, get_uniqueCity, get_uniqueCountry, get_destinationBycity };
