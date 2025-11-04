import mongoose from "mongoose";
const ngoSchema = new mongoose.Schema({
  ngoName: String,
  contact: String,
  city: String,
  available: Boolean,
  joinedAt: { type: Date, default: Date.now },
});

const NGO = mongoose.model("NGO", ngoSchema);
export default NGO;
