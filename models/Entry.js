const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, required: true },
    tags: { type: [String], default: [] },
    signalStrength: {
      type: String,
      enum: ["strong", "unstable", "broken"],
      default: "unstable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
