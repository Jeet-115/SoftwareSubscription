import mongoose from "mongoose";

const webhookLogSchema = new mongoose.Schema(
  {
    eventType: { type: String },
    rawBody: { type: String },
    headers: { type: Object },
    processed: { type: Boolean, default: false },
    error: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const WebhookLog = mongoose.model("WebhookLog", webhookLogSchema);

export default WebhookLog;


