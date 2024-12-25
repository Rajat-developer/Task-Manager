const express = require("express");
const { signup, login, getAllUsers, getUserById } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users",getAllUsers);
router.get("/userById/:id",getUserById);

module.exports = router;
