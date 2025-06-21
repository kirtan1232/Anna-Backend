const mongoose = require("mongoose");

const completedLessonsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedLessons: [
      {
        day: { type: String, required: true },
        instrument: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const CompletedLessons = mongoose.model("CompletedLessons", completedLessonsSchema);
module.exports = CompletedLessons;