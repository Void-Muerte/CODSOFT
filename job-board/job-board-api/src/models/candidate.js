const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("candidates", candidateSchema);
