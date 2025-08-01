import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String, // hashed (local only)
  googleId: String,
});

export default mongoose.model("User", userSchema);
