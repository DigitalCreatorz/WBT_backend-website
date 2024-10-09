const custom_package = require("../models/custom_package_model"); // Import the custom_package model

// CREATE - Add a new custom_package document
const createcustom_package = async (req, res) => {
  try {
    const newPackage = new custom_package(req.body); // Create a new instance using the request body
    await newPackage.save(); // Save the custom_package to the database
    res.status(201).json({ data: newPackage });
  } catch (error) {

    console.error("Error creating custom_package:", error);
    res.status(500).json({ error });
  }
};

// READ - Get all custom_packages
const getcustom_packages = async (req, res) => {
  try {
    const custom_packages = await custom_package.find(); // Retrieve all custom_package documents
    res.status(200).json({ message: custom_packages });
  } catch (error) {
    console.error("Error retrieving custom_packages:", error);
    res.status(500).json({ error });
  }
};

// READ - Get a specific custom_package by ID
const getcustom_packageById = async (req, res) => {
  try {
    const custom_package = await custom_package.findById(req.params.id); // Find custom_package by ID
    if (!custom_package) {
      return res.status(404).json({message: "custom_package not found" });
    }
    res.status(200).json({ message: custom_package });
  } catch (error) {
    console.error("Error retrieving custom_package:", error);
    res.status(500).json({ error });
  }
};

// UPDATE - Update a specific custom_package by ID
const updatecustom_package = async (req, res) => {
  try {
    const updatedPackage = await custom_package.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data before updating
    });
    if (!updatedPackage) {
      return res.status(404).json({message: "custom_package not found" });
    }
    res.status(200).json({ message: updatedPackage });
  } catch (error) {
    console.error("Error updating custom_package:", error);
    res.status(500).json({ error });
  }
};

// DELETE - Remove a specific custom_package by ID
const deletecustom_package = async (req, res) => {
  try {
    const deletedPackage = await custom_package.findByIdAndDelete(req.params.id); // Find and delete by ID
    if (!deletedPackage) {
      return res.status(404).json({ success: false, message: "custom_package not found" });
    }
    res.status(200).json({ message: "custom_package deleted successfully" });
  } catch (error) {
    console.error("Error deleting custom_package:", error);
    res.status(500).json({ error });
  }
};

module.exports = {
  createcustom_package,
  getcustom_packages,
  getcustom_packageById,
  updatecustom_package,
  deletecustom_package,
};
