import crypto from "crypto";

import Trip from "../models/Trip.js";

import {
  extractTravelData,
} from "../services/gemini.service.js";

import {
  generateItinerary,
} from "../services/itinerary.service.js";

export const uploadTrip =
  async (req, res) => {
    try {

      const extractedData =
        await extractTravelData("");

      const itinerary =
        generateItinerary(
          extractedData
        );

      const trip =
        await Trip.create({
          user: req.user.id,

          title:
            extractedData.departure +
            " Trip",

          originalFile:
            req.file.filename,

          extractedData,

          itinerary,

          shareId:
            crypto.randomUUID(),
        });

      res.json(trip);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

export const getMyTrips =
  async (req, res) => {

    const trips =
      await Trip.find({
        user:
          req.user.id,
      });

    res.json(trips);
  };

export const getSharedTrip =
  async (req, res) => {

    const trip =
      await Trip.findOne({
        shareId:
          req.params.shareId,
      });

    res.json(trip);
  };