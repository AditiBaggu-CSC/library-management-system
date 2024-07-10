const express = require("express");
const imageController = require("../Controllers/ImageController");
const fileUpload = require("../Middleware/fileUpload");

const router = express.Router();

router.post(
  "/update/images",
  fileUpload.fields([
    { name: "registrationImage", maxCount: 1 },
    { name: "paymentsImage", maxCount: 1 },
  ]),
  imageController.updateImages
);

router.get("/get/images", imageController.getImages);

module.exports = router;
