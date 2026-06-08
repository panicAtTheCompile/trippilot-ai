import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    originalFile: String,

    extractedData: Object,

    itinerary: String,

    warnings: [String],

    shareId: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Trip",
  tripSchema
);