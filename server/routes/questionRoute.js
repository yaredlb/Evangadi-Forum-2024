const express = require("express");
const router = express.Router();

// // authentication middleware
// const authMiddleware = require("../middleware/authMiddleware");

// router.get("/all-questions", authMiddleware, (req, res) => {
//   res.send("all questions");
// });
router.get("/all-questions", (req, res) => {
  res.send("all questions");
});

module.exports = router;
