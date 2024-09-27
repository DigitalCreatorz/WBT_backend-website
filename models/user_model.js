const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Method to compare passwords
userSchema.methods.comparePass = async function(password) {
    return bcrypt.compare(password, this.password);
}

// Method to generate JWT token
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.user_type === 'ADMIN', 
            },
            process.env.JWT_KEY, // Ensure that JWT_KEY is set in your environment variables
            { expiresIn: "30d" } // Token expiration time
        );
    } catch (error) {
        console.error('Token generation failed:', error);
        throw new Error('Token generation failed');
    }
};


const User = mongoose.model("webusers", userSchema);

module.exports = User;
