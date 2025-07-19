import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const createDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/JobTailor";
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);

    // Create collections by importing models (this will create the collections if they don't exist)
    await import("./models/User.js");
    await import("./models/About_User.js");
    
    console.log("📚 Collections created based on models:");
    console.log("  - users (from User.js model)");
    console.log("  - about_users (from About_User.js model)");
    
    // Show all collections in database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("\n📚 All collections in database:");
    collections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    console.log("\n🎉 Database structure created successfully!");
    console.log("\n🔗 Your API endpoints are ready:");
    console.log("- GET http://localhost:5001/api/ (Server status)");
    console.log("- GET http://localhost:5001/api/users (All users)");
    console.log("- GET http://localhost:5001/api/about-users (All profiles)");
    console.log("- POST http://localhost:5001/api/users (Create user)");
    console.log("- POST http://localhost:5001/api/about-users (Create profile)");

  } catch (error) {
    console.error("❌ Error creating database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
};

// Run the database creation
createDatabase(); 