import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

// Connect DB
async function connectDB() {
  try {
    await client.connect();
    db = client.db("chatapp");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(" DB Connection Failed", err);
  }
}

connectDB();


// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});