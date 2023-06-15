import { randomUUID } from "crypto";
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: randomUUID(),
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

export const Users = mongoose.model("user", userSchema);
