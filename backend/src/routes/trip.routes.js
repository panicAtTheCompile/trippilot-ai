import express from "express";

import { protect }
from "../middleware/auth.middleware.js";

import { upload }
from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  async (req, res) => {

    res.json({
      message:
        "File uploaded successfully",

      file: req.file
    });

  }
);

export default router;