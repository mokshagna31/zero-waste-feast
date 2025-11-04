import express from "express";
import Donor from "./donormodel.js";

const router = express.Router();

// POST route to add donor
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donation added successfully!" });
  } catch (err) {
    console.error("❌ Error saving donor:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all donors (optional)
router.get("/", async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
});

export default router;
