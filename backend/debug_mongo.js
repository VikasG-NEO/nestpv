require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
// console.log('URI:', uri); // Be careful not to log credentials

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Connection Sucessful!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Connection Failed:', err.message);
        if (err.message.includes('SSL') || err.message.includes('tls')) {
            console.log('💡 TIP: This might be an IP Whitelist issue or SSL Block. Check MongoDB Atlas Network Access.');
        }
        process.exit(1);
    });
