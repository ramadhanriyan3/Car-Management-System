import express from "express";
const router = express.Router();
const uploadOnMemory = require("./../middleware/uploadOnMemory");
const carController = require("./../controller/carControllers");
const { superAdminAuth, adminAuth } = require("./../middleware/authController");

router.get("/", carController.getCars);

router.get("/:id", carController.getCarById);

router.post(
  "/create",
  adminAuth,
  uploadOnMemory.single("picture"),
  carController.postCar
);

router.patch(
  "/:id/update",
  adminAuth,
  uploadOnMemory.single("picture"),
  carController.updateCar
);

router.delete("/:id/delete", adminAuth, carController.deleteCar);

module.exports = router;
