import mongoose from "mongoose";
const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  foodType: { type: String, required: true },
  availabilityTime: { type: String },
  expiryTime: { type: String },
  quantity: { type: String },
  address: { type: String },
  location: String, 
});

export default mongoose.model("Donor", donorSchema);

