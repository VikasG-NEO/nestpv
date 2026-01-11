require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dns = require('dns');

// Force using Google DNS to resolve ENOTFOUND on some VPS
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log('Using Google DNS: 8.8.8.8');
} catch (e) {
    console.log('Could not set custom DNS servers', e.message);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI must be defined in .env');
    process.exit(1);
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String, select: false },
    role: { type: String, default: 'user' },
    fullName: String,
    nestId: String,
    phone: String,
}, { strict: false });

const User = mongoose.model('User', userSchema);

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        // Add connection options to fix DNS/IPv6 issues
        await mongoose.connect(MONGODB_URI, {
            family: 4, // Force IPv4
            serverSelectionTimeoutMS: 5000
        });
        console.log('Connected to MongoDB');

        const email = 'nestniffy@admin';
        const password = 'nestniffy@admin2028';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if exists
        const exists = await User.findOne({ email });
        if (exists) {
            console.log('Admin user already exists. Updating role/password...');
            exists.role = 'admin';
            exists.password = hashedPassword;
            await exists.save();
        } else {
            console.log('Creating admin user...');
            await User.create({
                email,
                password: hashedPassword,
                role: 'admin',
                fullName: 'Super Admin',
                nestId: 'ADMIN-001',
                phone: '+910000000000',
                idCardGenerated: true,
                isDocumentVerified: true
            });
        }

        console.log('Admin user seeded successfully.');
    } catch (error) {
        console.error('Error seeding admin:', error);
        // Detailed error for debugging
        if (error.reason) console.error('Reason:', error.reason);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
