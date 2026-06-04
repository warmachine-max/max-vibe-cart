import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing from environment variables!");
        }

        const conn = await mongoose.connect(MONGO_URI);
        console.log(`📁 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1); // Exit the process with failure code if connection fails
    }
};

export default connectDB;