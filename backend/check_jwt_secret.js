const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env file does not exist in backend directory.');
} else {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const hasSecret = envContent.split('\n').some(line => line.startsWith('JWT_SECRET='));
    if (hasSecret) {
        console.log('✅ JWT_SECRET is present in .env');
    } else {
        console.log('❌ JWT_SECRET is MISSING in .env');
        console.log('Current .env keys:', envContent.split('\n').map(l => l.split('=')[0]).filter(k => k.trim()));
    }
}
