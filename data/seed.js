require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/userModel");

const seedUsers = [
  {
    name: "Alice Martin",
    email: "alice@example.com",
    role: "admin",
    createdAt: "2024-01-15"
  },
  {
    name: "Lucas Bernard",
    email: "lucas@example.com",
    role: "user",
    createdAt: "2024-02-10"
  },
  {
    name: "Emma Robert",
    email: "emma@example.com",
    role: "user",
    createdAt: "2024-03-05"
  }
];

const runSeed = async () => {
  try {
    await connectDB();

    const count = await User.countDocuments();

    if (count === 0) {
      await User.insertMany(seedUsers);
      console.log("Seed termine: 3 utilisateurs inseres");
    } else {
      console.log("Seed ignore: collection users deja remplie");
    }
  } catch (error) {
    console.error("Erreur pendant le seed:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

runSeed();
