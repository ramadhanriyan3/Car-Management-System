import express from "express";
const router = express.Router();
const userController = require("./../controller/userController");
const {
  authentification,
  regularAdminAuth,
  superAdminAuth,
} = require("./../middleware/authController");

router.post("/register", userController.memberRegister);
router.post("/admin/register", superAdminAuth, userController.adminRegister);
router.post("/login", userController.login);
router.get("/current-user", authentification, userController.currentUser);

module.exports = router;
