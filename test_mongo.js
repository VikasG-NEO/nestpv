const mongoose = require('mongoose');
require('dotenv').config({ path: 'backend/.env' });

async function run() {
    const uri = process.env.MONGODB_URI;
    console.log('Testing connection to:', uri);

    if (!uri) {
        console.error('Error: MONGODB_URI is undefined. Check .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log('SUCCESS: Connected to MongoDB!');
        await mongoose.connection.close();
    } catch (error) {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error(error);
    }
}

run();
