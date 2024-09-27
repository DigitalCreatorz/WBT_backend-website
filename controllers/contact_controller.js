const contact = require('../models/contact_model');
const ExcelJS= require('exceljs')

const add_contact = async (req, res) => {
    const { name,email,phone,note } = req.body;

    try {
        const response = await contact.create({ name,email,phone,note })
        res.status(200).json({ "Message": response });
    } catch (error) {
        res.status(400).json({ "Message": error.message });
    }
};

const get_contact = async (req, res) => {
    try {
        const response = await contact.find();
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};


const remove_contact = async (req, res) => {

    const { _id } = req.params;
    try {
        const response = await contact.findByIdAndDelete(_id);
        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
};

const edit_contact = async (req, res) => {
    const { _id } = req.params;
    const { name,email,phone,note } = req.body;
    try {
        const response = await contact.findByIdAndUpdate(_id, { name,email,phone,note }, { new: true });
        console.log(response);

        res.status(200).json({ "message": response });
    } catch (error) {
        res.status(400).json({ "message": error.message });
    }
}



// const downloadInquiries = async (req, res) => {
//     try {
//         // Fetch inquiries from the database
//         const inquiries = await contact.find();
    
//         // Create Excel workbook and worksheet
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Inquiries');
    
//         // Define columns for the worksheet, including Serial Number
//         worksheet.columns = [
//           { header: 'Serial No.', key: 'serial_no', width: 10 },
//           { header: 'Name', key: 'name', width: 20 },
//           { header: '', key: 'company_name', width: 30 },
//           { header: 'User Number', key: 'user_number', width: 20 },
//           { header: 'Region', key: 'region', width: 20 },
//           { header: 'Message', key: 'message', width: 50 },
//           { header: 'Status', key: 'status', width: 10 },
//         ];
    
//         // Populate the worksheet with data and add serial numbers
//         inquiries.forEach((contact, index) => {
//           worksheet.addRow({
//             serial_no: index + 1, // Increment the serial number starting from 1
//             name: contact.name,
//             company_name: contact.company_name,
//             user_number: contact.user_number,
//             region: contact.region,
//             message: contact.message,
//             status: contact.status ? 'true' : 'false'
//           });
//         });
    
//         // Set headers for file download
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//         res.setHeader('Content-Disposition', 'attachment; filename=inquiries.xlsx');
    
//         // Write workbook to the response and end it
//         await workbook.xlsx.write(res);
//         res.end();
    
//       } catch (error) {
//         console.error('Error creating Excel file:', error);
//         res.status(500).json({ message: 'Inquiries data not found' });
//       }
//     };

module.exports = { add_contact, get_contact, edit_contact, remove_contact };
