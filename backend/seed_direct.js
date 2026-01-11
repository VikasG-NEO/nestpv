require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Hardcoded Standard Connection String to bypass VPS DNS/SRV issues
// Based on: mongodb+srv://nestunion:nestunion222@nestunion.yqtys4s.mongodb.net
const MONGODB_URI = "mongodb://nestunion:nestunion222@nestunion-shard-00-00.yqtys4s.mongodb.net:27017,nestunion-shard-00-01.yqtys4s.mongodb.net:27017,nestunion-shard-00-02.yqtys4s.mongodb.net:27017/?ssl=true&authSource=admin&w=majority";

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
        console.log('Connecting to MongoDB via Direct Connection String...');
        console.log('Target:', MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Log without password

        // Connect with forceful IPv4
        await mongoose.connect(MONGODB_URI, {
            family: 4,
            serverSelectionTimeoutMS: 10000 // Wait up to 10s
        });
        console.log('Connected to MongoDB successfully!');

        const email = 'nestniffy@admin';
        const password = 'nestniffy@admin2028';
        const hashedPassword = await bcrypt.hash(password, 10);

        const exists = await User.findOne({ email });
        if (exists) {
            console.log('Admin user exists. Updating...');
            exists.role = 'admin';
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
        console.log('\n--- TROUBLESHOOTING ---');
        console.log('1. Ensure your IP is whitelisted in MongoDB Atlas (Network Access).');
        console.log('2. Try adding 0.0.0.0/0 to the whitelist to allow all IPs.');
        console.log('3. Your VPS might be blocking port 27017 outbound.');
    } finally {
        await mongoose.disconnect();
    }
}

seed();
