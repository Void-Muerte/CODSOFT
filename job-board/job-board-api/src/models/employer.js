const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employers", employerSchema);
