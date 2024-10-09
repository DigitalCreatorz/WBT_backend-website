const service = require('../models/service_model');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Multer memory storage configuration for file handling
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only image files are allowed.'), false);
    }
  },
});

const addservice = async (req, res) => {
    const { name, desc } = req.body;
  
    console.log("Request body:", req.body); // Log the request body
    console.log("Uploaded file:", req.file); // Log the uploaded file details
  
    try {
      // Validate that required fields are present in the request
      if (!name || !desc) {
        return res.status(400).json({ "Message": "Service name and description are required" });
      }
  
      let imageUrl = '';
  
      // Check and upload the image file if provided
      if (req.file) {
        try {
          const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: 'uploads', resource_type: 'auto' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
          });
  
          // If upload is successful, set the imageUrl
          imageUrl = uploadResult.secure_url;
          console.log("Image successfully uploaded. URL:", imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          return res.status(500).json({ "Message": "Failed to upload image", "Error": error.message });
        }
      } else {
        return res.status(400).json({ "Message": "Image file is required" });
      }
  
      console.log("Final Data to be inserted:", { name, desc, image: imageUrl });
  
      // Save the service in the database using correct schema field names
      const newService = await service.create({
        name,          // Field should match schema (if schema field is 'name')
        desc,          // Field should match schema (if schema field is 'desc')
        image: imageUrl, // Field should match schema (if schema field is 'image')
      });
  
      res.status(201).json({ "Message": "Service created successfully", "Data": newService });
    } catch (error) {
      console.error('Error in addservice:', error);
      res.status(500).json({ "Message": "Failed to add service", "Error": error.message });
    }
  };
  
// Get all services
const getservice = async (req, res) => {
  try {
    const services = await service.find();
    res.status(200).json({ message: services });
  } catch (error) {
    console.error('Error in getservice:', error);
    res.status(500).json({ message: error.message });
  }
};

// // Update an existing service
// const updateservice = async (req, res) => {
//   const { _id } = req.params;
//   const { name, desc } = req.body;

//   try {
//     let updateData = {};
//     if (name) updateData.cust_name = name;
//     if (desc) updateData.message = desc;

//     // If a new image file is uploaded
//     if (req.file) {
//       try {
//         const uploadResult = await cloudinary.uploader.upload_stream({
//           folder: 'uploads',
//           resource_type: 'auto',
//         });
//         streamifier.createReadStream(req.file.buffer).pipe(uploadResult);
//         updateData.image = uploadResult.secure_url;
//       } catch (error) {
//         return res.status(500).json({ "Message": "Failed to upload image", "Error": error.message });
//       }
//     }

//     // Update service in the database
//     const updatedService = await service.findByIdAndUpdate(
//       _id,
//       { $set: updateData },
//       { new: true }
//     );

//     if (!updatedService) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     return res.status(200).json({ message: 'Service updated successfully', service: updatedService });
//   } catch (error) {
//     console.error('Error in updateservice:', error);
//     return res.status(500).json({ message: 'Error updating service', error: error.message });
//   }
// };


const updateservice = async (req, res) => {
    const { _id } = req.params;
    const { name, desc } = req.body;
  
    try {
      let updateData = {};
      if (name) updateData.name = name; // Ensure you are using the correct property name
      if (desc) updateData.desc = desc; // Ensure you are using the correct property name
  
      // If a new image file is uploaded
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'uploads', resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
  
          // Convert the buffer to a stream and pipe it to Cloudinary
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
  
        // Save the URL of the uploaded image
        updateData.image = uploadResult.secure_url;
      }
  
      // Update service in the database
      const updatedService = await service.findByIdAndUpdate(
        _id,
        { $set: updateData },
        { new: true }
      );
  
      if (!updatedService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      return res.status(200).json({ message: 'Service updated successfully', service: updatedService });
    } catch (error) {
      console.error('Error in updateservice:', error);
      return res.status(500).json({ message: 'Error updating service', error: error.message });
    }
  };

// Delete a service
const deleteservice = async (req, res) => {
  const { _id } = req.params;

  try {
    const response = await service.findByIdAndDelete(_id);
    if (!response) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Successfully Deleted", response });
  } catch (error) {
    console.error('Error in deleteservice:', error);
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};

// Export the controller functions and multer upload middleware
module.exports = { upload, addservice, getservice, updateservice, deleteservice };
