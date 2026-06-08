import express from "express";

import { protect }
from "../middleware/auth.middleware.js";

import { upload }
from "../middleware/upload.middleware.js";

import {
  uploadTrip,
  getMyTrips,
  getSharedTrip,
}
from "../controllers/trip.controller.js";

const router =
  express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadTrip
);

router.get(
  "/",
  protect,
  getMyTrips
);

router.get(
  "/share/:shareId",
  getSharedTrip
);

export default router;