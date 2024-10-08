const mongoose = require('mongoose');
require('dotenv').config()

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
};

module.exports = {db};