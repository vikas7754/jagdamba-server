const router = require("express").Router();
const galleryController = require("../controllers/galleryController");
const { auth, roleAuth } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.post(
  "/",
  auth,
  roleAuth,
  upload.single("image"),
  galleryController.createGallery
);

router.get("/", galleryController.getGallery);

router.put(
  "/:id",
  auth,
  roleAuth,
  upload.single("image"),
  galleryController.updateGallery
);

router.delete("/:id", auth, roleAuth, galleryController.deleteGallery);

module.exports = router;
