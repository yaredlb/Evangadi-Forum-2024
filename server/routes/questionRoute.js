const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// question controllers
const {
  askQuestion,
  getAllQuestions,
  getQuestionDetail,
} = require("../controller/questionController");

// router.get("/ask-questions", authMiddleware, (req, res) => {
//   res.send("all questions");
// });

// all questions route
router.get("/all-questions", authMiddleware, getAllQuestions);

// ask questions route
router.post("/ask-questions", authMiddleware, askQuestion);

// detail question route
router.get("/detail-question", authMiddleware, getQuestionDetail);

module.exports = router;
