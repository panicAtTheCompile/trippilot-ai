import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import tripRoutes from "./routes/trip.routes.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("TripPilot API Running");
});

const PORT = process.env.PORT || 8000;
import { GoogleGenerativeAI }
from "@google/generative-ai";

app.get(
  "/test-gemini",
  async (req, res) => {

    try {

      const genAI =
        new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY
        );

      const model =
        genAI.getGenerativeModel({
          model: "gemini-2.0-flash"
        });

      const result =
        await model.generateContent(
          "Say hello in one sentence."
        );

      res.send(
        result.response.text()
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message
      });

    }

  }
);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});