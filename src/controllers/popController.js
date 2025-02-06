const Popup = require("../models/popup");

const createPopup = async (req, res) => {
  try {
    const { image, link } = req.body;
    const isActivePopup = await Popup.findOne({ show: true });

    const newPopup = new Popup({ image, link, show: !isActivePopup });

    await newPopup.save();
    return res.status(201).json(newPopup);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPopups = async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    return res.status(200).json(popups);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getPopup = async (req, res) => {
  try {
    const popup = await Popup.findOne({ show: true });
    return res.status(200).json(popup);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, link, show } = req.body;
    const updatedPopup = await Popup.findByIdAndUpdate(
      id,
      { image, link, show },
      { new: true }
    );
    return res.status(200).json(updatedPopup);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;
    await Popup.findByIdAndDelete(id);
    return res.status(204).json({ message: "Popup deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPopup,
  getPopups,
  getPopup,
  updatePopup,
  deletePopup,
};
