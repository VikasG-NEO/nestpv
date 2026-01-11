/**
 * One-time admin seed script
 * Safe to re-run (idempotent)
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment");
    process.exit(1);
}

/**
 * User schema (minimal, flexible)
 */
const userSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        password: { type: String, select: false },
        role: { type: String, default: "user" },
        fullName: String,
        nestId: String,
        phone: String,
        idCardGenerated: Boolean,
        isDocumentVerified: Boolean,
    },
    { strict: false }
);

const User = mongoose.model("User", userSchema);

async function seed() {
    try {
        console.log("🔌 Connecting to MongoDB (SRV)...");
        console.log(
            "Target:",
            MONGODB_URI.replace(/:([^:@]+)@/, ":****@")
        );

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 15000,
        });

        console.log("✅ Connected to MongoDB");

        const email = "nestniffy@admin";
        const plainPassword = "nestniffy@admin2028";
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        let user = await User.findOne({ email }).select("+password");

        if (user) {
            console.log("ℹ️ Admin user exists. Updating role/password...");
            user.role = "admin";
            user.password = hashedPassword;
            await user.save();
        } else {
            console.log("➕ Creating admin user...");
            await User.create({
                email,
                password: hashedPassword,
                role: "admin",
                fullName: "Super Admin",
                nestId: "ADMIN-001",
                phone: "+910000000000",
                idCardGenerated: true,
                isDocumentVerified: true,
            });
        }

        console.log("🎉 Admin user seeded successfully");
    } catch (error) {
        console.error("❌ Error seeding admin:", error.message);
        console.log("\n--- TROUBLESHOOTING ---");
        console.log("1. Ensure VPS IP is whitelisted in MongoDB Atlas");
        console.log("2. Ensure MONGODB_URI uses correct *cluster hostname*");
        console.log("3. Ensure SRV DNS resolves (_mongodb._tcp.<cluster>)");
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seed();
