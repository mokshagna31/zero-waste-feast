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

/* ==============================
   Donor Schema & Routes
============================== */
const donorSchema = new mongoose.Schema({
  name: String,
  contact: String,
  foodType: String,
  quantity: String,
  availabilityTime: String,
  expiryTime: String,
  address: String,
  location: String,
});

const Donor = mongoose.model("Donor", donorSchema);

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

/* ==============================
   NGO Schema & Routes
============================== */
const ngoSchema = new mongoose.Schema({
  ngoName: String,
  contactPerson: String,
  phone: String,
  email: String,
  address: String,
  city: String,
  state: String,
  createdAt: { type: Date, default: Date.now },
});

const NGO = mongoose.model("NGO", ngoSchema);

// Add NGO (POST)
app.post("/api/ngo_register", async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.status(201).json({ message: "NGO registered successfully!", ngo });
  } catch (error) {
    res.status(500).json({ message: "Error registering NGO", error });
  }
});

// Get all NGOs (GET)
app.get("/api/ngo_register", async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.status(200).json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching NGOs", error });
  }
});

/* ==============================
   Feedback Schema & Routes
============================== */
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Add Feedback (POST)
app.post("/api/feedback", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!", feedback });
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
});

// Get all Feedback (GET)
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
});

/* ==============================
   HTML Routes
============================== */
app.get("/", (req, res) => {
  res.send("Welcome to the Food Donation API!");
});

app.get("/donor.html", (req, res) => {
  res.sendFile(path.join(__dirname, "donor.html"));
});

app.get("/receiver.html", (req, res) => {
  res.sendFile(path.join(__dirname, "receiver.html"));
});

app.get("/ngo_register.html", (req, res) => {
  res.sendFile(path.join(__dirname, "ngo_register.html"));
});

app.get("/feedback.html", (req, res) => {
  res.sendFile(path.join(__dirname, "feedback.html"));
});

/* ==============================
   Start the Server
============================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
