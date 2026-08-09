import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await User.deleteMany();

    const adminPassword = await bcrypt.hash("admin123", 10);
    const receptionistPassword = await bcrypt.hash("reception123", 10);
    const employeePassword = await bcrypt.hash("employee123", 10);

    await User.create([
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Receptionist User",
        email: "receptionist@gmail.com",
        password: receptionistPassword,
        role: "receptionist",
      },
      {
        name: "Employee User",
        email: "employee@gmail.com",
        password: employeePassword,
        role: "employee",
      },
    ]);

    console.log("Users seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();