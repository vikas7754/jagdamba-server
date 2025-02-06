const router = require("express").Router();
const popupController = require("../controllers/popController");
const { auth, roleAuth } = require("../middlewares/auth");

router.post("/", auth, roleAuth, popupController.createPopup);

router.get("/", popupController.getPopups);

router.get("/:id", popupController.getPopup);

router.put("/:id", auth, roleAuth, popupController.updatePopup);

router.delete("/:id", auth, roleAuth, popupController.deletePopup);

module.exports = router;
