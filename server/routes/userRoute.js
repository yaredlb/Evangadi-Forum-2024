const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");


// user controllers
const { register, login, checkUser } = require("../controller/userController");

// register route
router.post("/register", register);

// login user route
router.post("/login", login);

// check user route
// router.get("/check", checkUser);
router.get("/check", authMiddleware, checkUser);


module.exports = router;
