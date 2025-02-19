import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, 
  date: { type: Date, default: Date.now }, 
  attemptsLeft: { type: Number, default: 3 }, 
});

export const userModel = mongoose.model("userModel", userSchema);