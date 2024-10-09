    // controllers/homeController.js
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const home = require('../models/home_model');
const sharp = require('sharp');


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Add Home function
// const add_home = async (req, res) => {
//     const { name, desc } = req.body;
//     const files = req.files;

//     console.log('Request body:', req.body);
//     console.log('Files:', files);

//     // Check for required fields
//     if (!name || !desc) {
//         return res.status(400).json({ "Message": "Missing required fields: name and desc" });
//     }

//     // Check for uploaded files
//     if (!files || files.length === 0) {
//         return res.status(400).json({ "Message": "No photos uploaded" });
//     }

//     try {
//         // Function to upload a single file to Cloudinary
//         const uploadFileToCloudinary = (file) => {
//             return new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     { folder: 'uploads' },
//                     (error, result) => {
//                         if (error) {
//                             console.error("Upload error:", error);
//                             reject(error);
//                         } else {
//                             resolve(result.secure_url); // Return the secure URL of the uploaded file
//                         }
//                     }
//                 );
//                 streamifier.createReadStream(file.buffer).pipe(uploadStream);
//             });
//         };

//         // Upload all files to Cloudinary and get their URLs
//         const uploadPromises = files.map(uploadFileToCloudinary);
//         const photoUrls = await Promise.all(uploadPromises);

//         // Create a new home document with the photo URLs
//         const newHome = await home.create({ name, desc, photos: photoUrls });

//         res.status(200).json({ "Message": newHome });
//     } catch (error) {
//         console.error("Error during upload or saving:", error);
//         res.status(500).json({ "Message": error.message });
//     }
// };


// const add_home = async (req, res) => {
//     const { name, desc } = req.body;
//     const files = req.files; // Note that `files` will now be an object

//     console.log('Request body:', req.body);
//     console.log('Files:', files);

//     // Check for required fields
//     if (!name || !desc) {
//         return res.status(400).json({ "Message": "Missing required fields: name and desc" });
//     }

//     // Check if files object contains photos and cover_img fields
//     if (!files || !files['photos'] || files['photos'].length === 0) {
//         return res.status(400).json({ "Message": "No photos uploaded" });
//     }
//     if (!files['cover_img'] || files['cover_img'].length === 0) {
//         return res.status(400).json({ "Message": "No cover image uploaded" });
//     }

//     try {
//         // Function to upload a single file to Cloudinary
//         const uploadFileToCloudinary = (file) => {
//             return new Promise((resolve, reject) => {
//                 const uploadStream = cloudinary.uploader.upload_stream(
//                     { folder: 'uploads' },
//                     (error, result) => {
//                         if (error) {
//                             console.error("Upload error:", error);
//                             reject(error);
//                         } else {
//                             resolve(result.secure_url); // Return the secure URL of the uploaded file
//                         }
//                     }
//                 );
//                 streamifier.createReadStream(file.buffer).pipe(uploadStream);
//             });
//         };

//         // Upload all photos to Cloudinary and get their URLs
//         const photoUploadPromises = files['photos'].map(uploadFileToCloudinary);
//         const photoUrls = await Promise.all(photoUploadPromises);

//         // Upload the cover image (since we know it's a single file)
//         const coverImgUrl = await uploadFileToCloudinary(files['cover_img'][0]);

//         // Create a new home document with the photo URLs and cover image URL
//         const newHome = await home.create({
//             name,
//             desc,
//             photos: photoUrls,      // Array of photo URLs
//             cover_img: coverImgUrl   // Single cover image URL
//         });

//         res.status(200).json({ "Message": newHome });
//     } catch (error) {
//         console.error("Error during upload or saving:", error);
//         res.status(500).json({ "Message": error.message });
//     }
// };


// const add_home = async (req, res) => {
//     const { name, desc, titles } = req.body; // Retrieve titles from request body
//     const files = req.files; // `files` will be an object with `photos` and `cover_img`
  
//     console.log('Request body:', req.body);
//     console.log('Files:', files);
  
//     // Validate required fields
//     if (!name || !desc) {
//       return res.status(400).json({ "Message": "Missing required fields: name and desc" });
//     }
  
//     // Check if files object contains photos and cover_img fields
//     if (!files || !files['photos'] || files['photos'].length === 0) {
//       return res.status(400).json({ "Message": "No photos uploaded" });
//     }
//     if (!files['cover_img'] || files['cover_img'].length === 0) {
//       return res.status(400).json({ "Message": "No cover image uploaded" });
//     }
  
//     // Validate that titles array exists and has the same length as photos array
//     const titlesArray = Array.isArray(titles) ? titles : JSON.parse(titles || '[]'); // Handle titles array or stringified JSON
//     if (!Array.isArray(titlesArray) || titlesArray.length !== files['photos'].length) {
//       return res.status(400).json({ "Message": "Number of titles must match the number of photos uploaded" });
//     }
  
//     try {
//       // Function to upload a single file to Cloudinary
//       const uploadFileToCloudinary = (file) => {
//         return new Promise((resolve, reject) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: 'uploads' },
//             (error, result) => {
//               if (error) {
//                 console.error("Upload error:", error);
//                 reject(error);
//               } else {
//                 resolve(result.secure_url); // Return the secure URL of the uploaded file
//               }
//             }
//           );
//           streamifier.createReadStream(file.buffer).pipe(uploadStream);
//         });
//       };
  
//       // Upload all photos to Cloudinary and get their URLs
//       const photoUploadPromises = files['photos'].map(uploadFileToCloudinary);
//       const photoUrls = await Promise.all(photoUploadPromises);
  
//       // Combine photo URLs with titles to create an array of { url, title } objects
//       const photosWithTitles = photoUrls.map((url, index) => ({
//         url,
//         title: titlesArray[index], // Match each URL with its corresponding title
//       }));
  
//       // Upload the cover image (since we know it's a single file)
//       const coverImgUrl = await uploadFileToCloudinary(files['cover_img'][0]);
  
//       // Create a new home document with the photos array (containing URLs and titles) and cover image URL
//       const newHome = await home.create({
//         name,
//         desc,
//         photos: photosWithTitles,   // Array of photo objects with { url, title }
//         cover_img: coverImgUrl      // Single cover image URL
//       });
  
//       res.status(200).json({ "Message": newHome });
//     } catch (error) {
//       console.error("Error during upload or saving:", error);
//       res.status(500).json({ "Message": error.message });
//     }
//   };

// Function to resize the image using sharp
const resizeImage = async (buffer, width, height) => {
  return await sharp(buffer)
    .resize(width, height) // Resize to given width and height
    .toBuffer(); // Return the resized image buffer
};

const add_home = async (req, res) => {
  const { name, desc, titles } = req.body; // Retrieve titles from request body
  const files = req.files; // `files` will be an object with `photos` and `cover_img`

  console.log('Request body:', req.body);
  console.log('Files:', files);

  // Validate required fields
  if (!name || !desc) {
    return res.status(400).json({ "Message": "Missing required fields: name and desc" });
  }

  // Check if files object contains photos and cover_img fields
  if (!files || !files['photos'] || files['photos'].length === 0) {
    return res.status(400).json({ "Message": "No photos uploaded" });
  }
  if (!files['cover_img'] || files['cover_img'].length === 0) {
    return res.status(400).json({ "Message": "No cover image uploaded" });
  }

  // Validate that titles array exists and has the same length as photos array
  const titlesArray = Array.isArray(titles) ? titles : JSON.parse(titles || '[]'); // Handle titles array or stringified JSON
  if (!Array.isArray(titlesArray) || titlesArray.length !== files['photos'].length) {
    return res.status(400).json({ "Message": "Number of titles must match the number of photos uploaded" });
  }

  try {
    // Function to upload a single file to Cloudinary
    const uploadFileToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' }, // Specify the folder in Cloudinary
          (error, result) => {
            if (error) {
              console.error("Upload error:", error);
              reject(error);
            } else {
              resolve(result.secure_url); // Return the secure URL of the uploaded file
            }
          }
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    };

    // Resize and upload all photos to Cloudinary and get their URLs
    const photoUploadPromises = files['photos'].map(async (photo) => {
      // Resize image using sharp before uploading
      const resizedBuffer = await resizeImage(photo.buffer, 1280, 1080  ); // Resize to 800x800 or any desired size
      return uploadFileToCloudinary({ buffer: resizedBuffer }); // Upload resized image
    });
    const photoUrls = await Promise.all(photoUploadPromises);

    // Combine photo URLs with titles to create an array of { url, title } objects
    const photosWithTitles = photoUrls.map((url, index) => ({
      url,
      title: titlesArray[index], // Match each URL with its corresponding title
    }));

    // Resize and upload the cover image (since we know it's a single file)
    const resizedCoverBuffer = await resizeImage(files['cover_img'][0].buffer, 1200, 600); // Resize to desired size
    const coverImgUrl = await uploadFileToCloudinary({ buffer: resizedCoverBuffer });

    // Create a new home document with the photos array (containing URLs and titles) and cover image URL
    const newHome = await home.create({
      name,
      desc,
      photos: photosWithTitles,   // Array of photo objects with { url, title }
      cover_img: coverImgUrl      // Single cover image URL
    });

    res.status(200).json({ "Message": newHome });
  } catch (error) {
    console.error("Error during upload or saving:", error);
    res.status(500).json({ "Message": error.message });
  }
};


const get_home = async (req, res) => {
    try {
        const response = await home.find();
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};
const delete_home = async (req, res) => {
    try {
        const response = await home.deleteMany({});
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};


const remove_home = async (req, res) => {

    const { _id } = req.params;
    try {
        const response = await home.findByIdAndDelete(_id);
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};

const edit_home = async (req, res) => {
    const { _id } = req.params; 
    const { name, desc } = req.body;
    const files = req.files; 
    
    console.log('Request body:', req.body);
    console.log('Files:', files);

    // Find the existing home entry in the database
    let homeEntry;
    try {
        homeEntry = await home.findById(_id);
        if (!homeEntry) {
            return res.status(404).json({ "Message": "Home entry not found" });
        }
    } catch (error) {
        return res.status(500).json({ "Message": "Error finding home entry" });
    }

    // Function to upload a single file to Cloudinary and return its URL
    const uploadFileToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'uploads' },
                (error, result) => {
                    if (error) {
                        console.error("Upload error:", error);
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    };

    // Check and update fields based on what is provided in the request
    if (name) homeEntry.name = name;
    if (desc) homeEntry.desc = desc;

    // If a new cover image is provided, upload it and update the URL
    if (files && files['cover_img'] && files['cover_img'].length > 0) {
        try {
            const coverImgUrl = await uploadFileToCloudinary(files['cover_img'][0]);
            homeEntry.cover_img = coverImgUrl; // Update cover image URL
        } catch (error) {
            return res.status(500).json({ "Message": "Error uploading cover image" });
        }
    }

    // If new photos are provided, upload them and update the photos array
    if (files && files['photos'] && files['photos'].length > 0) {
        try {
            const photoUploadPromises = files['photos'].map(uploadFileToCloudinary);
            const newPhotoUrls = await Promise.all(photoUploadPromises);
            homeEntry.photos = newPhotoUrls; // Replace existing photos array with new URLs
        } catch (error) {
            return res.status(500).json({ "Message": "Error uploading photos" });
        }
    }

    // Save the updated home entry to the database
    try {
        const updatedHome = await homeEntry.save();
        res.status(200).json({ "Message": "Home entry updated successfully", updatedHome });
    } catch (error) {
        res.status(500).json({ "Message": "Error saving updated home entry" });
    }
};


module.exports = { add_home, get_home, edit_home, remove_home,delete_home };
