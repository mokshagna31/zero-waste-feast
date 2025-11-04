import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend (HTML, CSS, JS)
app.use(express.static(__dirname));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food_donation";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mongoose schema and model
const donorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  foodType: String,
  quantity: String,
  availabilityTime: String,
  expiryTime: String,
  address: String,
});

const Donor = mongoose.model("Donor", donorSchema);

// ✅ Routes

// Home test route
app.get("/", (req, res) => {
  res.send("Welcome to the Food Donation API!");
});

// Add donor (POST)
app.post("/api/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donation added successfully!", donor });
  } catch (error) {
    res.status(500).json({ message: "Error saving donor", error });
  }
});

// Get all donors (GET)
app.get("/api/donors", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});

// Serve HTML files directly
app.get("/donor.html", (req, res) => {
  res.sendFile(path.join(__dirname, "donor.html"));
});

app.get("/receiver.html", (req, res) => {
  res.sendFile(path.join(__dirname, "receiver.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

