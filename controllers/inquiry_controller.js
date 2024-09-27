const inquiry = require("../models/inquiriy_model");
const User = require("../models/user_model");

const addinquiry = async (req, res) => {
    try {
        const { name,email,phone,destination,tentative_month,note } = req.body;

        console.log("Register data:", { name,email,phone,destination,tentative_month,note  });

        const newInquiries = new inquiry({
            name,email,phone,destination,tentative_month,note
           
        });

        console.log("New user before save:", newInquiries);

        await newInquiries.save();

        console.log("New user after save:", newInquiries);

        return res.status(200).json({newInquiries});
    } catch (error) {
        console.log("Error during sending inquiry:", error);
        return res.status(500).json({ msg: "Oops Something went wrong", error: error.message });
    }
}

const get_inquiry = async (req, res) => {
    try {
        const response = await inquiry.find();
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};
module.exports ={addinquiry,get_inquiry}