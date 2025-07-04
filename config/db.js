require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });
        console.log('MongoDB Connected');
    } catch (e) {
        console.error('MongoDB not connected:', e);
        process.exit(1); // Exit process on connection failure
    }
};

module.exports = connectDb;