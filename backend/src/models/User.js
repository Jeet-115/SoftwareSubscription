import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },

    // Subscription system
    subscriptionActive: {
      type: Boolean,
      default: false,
    },
    subscriptionExpiry: {
      type: Date,
      default: null,
    },
    subscriptionPlan: {
      type: String,
      enum: ["yearly", "test", null],
      default: null,
    },

    // Software login token (not for website)
    softwareToken: {
      type: String,
      default: null,
    },

    // Device lock (only for software)
    deviceId: {
      type: String,
      default: null,
    },

    // Master admin support
    isMaster: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;


