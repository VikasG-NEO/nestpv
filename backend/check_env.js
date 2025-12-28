require('dotenv').config();
console.log('URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('File Content Check:');
const fs = require('fs');
console.log(fs.readFileSync('.env', 'utf8'));
