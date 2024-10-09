    const user = require("../models/user_model");
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const mongoose = require('mongoose')

    // const register = async (req, res) => {
    //     try {
    //         const { username, email, phone, password, role } = req.body;
    
    //         // Log the received data to check if it's coming correctly
    //         console.log("Register data:", { username, email, phone, role  });
    
    //         // Check if the user already exists
    //         const userExist = await user.findOne({ email });
    //         if (userExist) {
    //             return res.status(400).json({ msg: "Already Registered.." });
    //         }
    
    //         // Hash the password
    //         var salt = bcrypt.genSaltSync(10);
    //         var hash_Password = await bcrypt.hash(password, salt);
    
    //         // Create the new user
    //         const newUser = new user({
    //             username,
    //             email,
    //             phone,
    //             password: hash_Password,
    //             role
               
    //         });
    
    //         console.log("New user before save:", newUser);
    
    //         await newUser.save();
    
    //         console.log("New user after save:", newUser);
    
    //         // Generate token and respond
    //         return res.status(200).json({
    //             msg: "Registration Successful",
    //             token: await newUser.generateToken(),
    //             userId: newUser._id.toString()
    //         });
    //     } catch (error) {
    //         console.log("Error during registration:", error);
    //         if (error.name === 'ValidationError') {
    //             const validationErrors = Object.values(error.errors).map(err => err.message);
    //             return res.status(400).json({ msg: "Validation failed", errors: validationErrors });
    //         }
    //         return res.status(500).json({ msg: "Oops Not Found", error: error.message });
    //     }
    // }

    // const login = async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    //         const userExist = await user.findOne({ email });



    //         if (!userExist) {
    //             return res.status(400).json({ message: "Invalid credentials" });
    //         }

    //         // Compare the password
    //         const passwordMatch = await userExist.comparePass(password);

    //         if (passwordMatch) {
    //             return res.status(200).json({
    //                 message: "Login Successful",
    //                 token: await userExist.generateToken(),  // Corrected method name
    //                 userId: userExist._id.toString()
    //             });
    //         } else {
    //             return res.status(401).json({
    //                 message: "Invalid Email Or Password",
    //             });
    //         }

    //     } catch (error) {
    //         console.log("Error during login:", error);  // Log the error details
    //         return res.status(500).json({ msg: "Internal Error", error: error.message });
    //     }
    // }

    // const users = async (req, res) => {
    //     try {
    //         const userData = req.users;
    //         console.log(userData);
    //         return res.status(200).json({ userData });
    //     } catch (error) {
    //         console.log(`Error from user route: ${error}`);
    //     }
    // }

    // const allUser = async(req,res)=>{
    //     try {
    //             const response = await user.find();
    //             console.log(response);

    //             return res.status(200).json({response})
                

    //     } catch (error) {
    //         console.log(error);
            
    //         res.status(500).json({"message":error})
    //     }
    // }


    // const fetch_role = async (req, res) => {
    //     try {
    //         const { _id } = req.body;
    
    //         const userWithRole = await user.findById(_id);
    
    //         if (!userWithRole) {
    //             return res.status(404).json({ message: "User not found" });
    //         }
    
    //         console.log(userWithRole.role);
    
    //         return res.status(200).json({ role: userWithRole.role });
    //     } catch (error) {
    //         console.log('Error fetching current user details:', error);
    //         return res.status(500).json({ message: "Server error" });
    //     }
    // };
    
    
    
    
    // *-----------------------------------------
    // *-----------------------------------------
    
    //  Register Logic 💯
    
    // *-----------------------------------------
    // *-----------------------------------------
    const register = async (req, res) => {
        try {
          const { username, email, phone, password, role } = req.body;
      
          // Check if the user is already registered with the given email
          const userExist = await user.findOne({ email });
          if (userExist) {
            return res.status(400).json({ msg: "Already Registered.." });
          }
      
          // Hash the password before storing it in the database
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = await bcrypt.hash(password, salt);
      
          // Create a new user with hashed password
          const newUser = await user.create({
            username,
            email,
            phone,
            password: hashPassword,
            role,
          });
      
          // Generate a token for the new user
          const token = await newUser.generateToken();
      
          return res.status(200).json({
            msg: "Registration Successful",
            token,
            userId: newUser._id.toString(),
          });
      
        } catch (error) {
          console.error("Error during registration:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
      // Login Logic
      const login = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Check if a user with the given email exists
          const userExist = await user.findOne({ email });
          if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
      
          // Compare the given password with the stored hashed password
          const passwordMatch = await userExist.comparePass(password);
      
          if (passwordMatch) {
            const token = await userExist.generateToken();
      
            return res.status(200).json({
              message: "Login Successful",
              token,
              userId: userExist._id.toString(),
            });
          } else {
            return res.status(401).json({ message: "Invalid Email Or Password" });
          }
      
        } catch (error) {
          console.error("Error during login:", error);
          return res.status(500).json({ message: "Internal Error" });
        }
      };
      
      const users = async (req, res) => {

        try {
            const userData = req.users;
            console.log(userData);
            return res.status(200).json({ userData });
        } catch (error) {
            console.log(`error from user route${error}`);
        }
    
    }
      
      // Fetch a specific user by ID
      const eachuser = async (req, res) => {

        const { id } = req.params;
        console.log('userid', id);
        try {
            const eachuser = await user.find({ _id: id });
            console.log('each user data:', eachuser);
    
            return res.json(eachuser);
        } catch (error) {
            console.log(`error from ${error}`);
        }
    }
      const fetch_role = async (req, res) => {
        try {
            const { _id } = req.body;
    
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }
    
            const userWithRole = await user.findById(_id);
    
            if (!userWithRole) {
                return res.status(404).json({ message: "User not found" });
            }
    
            console.log(userWithRole.role);
    
            return res.status(200).json({ role: userWithRole.role });
        } catch (error) {
            console.log('Error fetching current user details:', error);
            return res.status(500).json({ message: "Server error" });
        }
    };

    const me = async (req, res, next) => {
        try {
          const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token
      
          if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
          }
      
          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_KEY); // Ensure JWT_KEY is in your environment variables
      
          // Find user by ID and attach to request object
          const users = await user.findById(decoded.userId).select("-password"); // Exclude password from response
          console.log("usersssssss",users);
          
          if (!users) {
            return res.status(404).json({ message: "User not found" });
          }
      
          req.user = users; // Attach user data to request
          next(); // Continue to the next middleware or route handler
        } catch (error) {
          console.error("Authentication error:", error);
          res.status(401).json({ message: "Invalid token, authorization denied" });
        }
      };
    
      
module.exports = { register, login, users,fetch_role ,eachuser,me};