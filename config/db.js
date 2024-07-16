const mongoose = require('mongoose');
const log = console.log;

const ATLAS_URL = process.env.ATLASDB_URL;

async function connectDB() {
    try {
        await mongoose.connect(ATLAS_URL);
        log("MongoDB connection successful");
    } catch (err) {
        log(`Error: ${err.message}`);
    }
}

module.exports = connectDB;
