import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,

    originalFile: String,

    extractedData: Object,

    itinerary: String,

    shareId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Trip", tripSchema);