const Image = require("../Models/Image");
const HttpError = require("../Middleware/http-error");

const updateImages = async (req, res, next) => {
  let registrationImage, paymentsImage, suggestionsImage;

  if (req.files) {
    registrationImage = req.files.registrationImage
      ? req.files.registrationImage[0].path
      : undefined;
    paymentsImage = req.files.paymentsImage
      ? req.files.paymentsImage[0].path
      : undefined;
    suggestionsImage = req.files.suggestionsImage
      ? req.files.suggestionsImage[0].path
      : undefined;
  }

  try {
    let images = await Image.findOne({});
    if (!images) {
      images = new Image({
        registrationImage,
        paymentsImage,
        suggestionsImage,
      });
    } else {
      if (registrationImage) images.registrationImage = registrationImage;
      if (paymentsImage) images.paymentsImage = paymentsImage;
      if (suggestionsImage) images.suggestionsImage = suggestionsImage;
    }

    await images.save();
    res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Failed to update images. Please try again.", 500)
    );
  }
};

const getImages = async (req, res, next) => {
  try {
    const images = await Image.findOne({});
    if (!images) {
      return res.status(404).json({ message: "Images not found" });
    }
    res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    return next(
      new HttpError("Failed to fetch images. Please try again.", 500)
    );
  }
};

module.exports = {
  updateImages,
  getImages,
};
