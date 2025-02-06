const Gallery = require("../models/gallery");
const uploadImage = require("../utils/upload-image");

const maxSize = 1024 * 1024 * 5; // 5MB

const createGallery = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Image is required" });
    if (!file.mimetype.startsWith("image"))
      return res.status(400).json({ message: "Please upload an image file" });
    if (file.size > maxSize)
      return res
        .status(400)
        .json({ message: `Please upload an image less than ${maxSize} MB` });

    const url = await uploadImage(file);
    const gallery = new Gallery({ image: url });
    await gallery.save();

    return res.status(201).json(gallery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    return res.status(200).json(gallery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateGallery = async (req, res) => {
  try {
    const id = req.params.id;
    const gallery = await Gallery.findById(id);
    if (!gallery) return res.status(404).json({ message: "Image not found" });

    const file = req.file;
    if (!file) return res.status(400).json({ message: "Image is required" });
    if (!file.mimetype.startsWith("image"))
      return res.status(400).json({ message: "Please upload an image file" });
    if (file.size > maxSize)
      return res
        .status(400)
        .json({ message: `Please upload an image less than ${maxSize} MB` });

    const url = await uploadImage(file);
    gallery.image = url;
    await gallery.save();

    return res.status(200).json(gallery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const id = req.params.id;
    await Gallery.findByIdAndDelete(id);
    return res.status(204).json({ message: "Image deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createGallery,
  getGallery,
  updateGallery,
  deleteGallery,
};
