import express from "express";
import NGO from "../models/ngoModel.js";

const router = express.Router();

// Register NGO
router.post("/", async (req, res) => {
  try {
    const ngo = new NGO(req.body);
    await ngo.save();
    res.status(201).json({ message: "NGO registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register NGO" });
  }
});

// Get all NGOs
router.get("/", async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NGOs" });
  }
});

export default router;
