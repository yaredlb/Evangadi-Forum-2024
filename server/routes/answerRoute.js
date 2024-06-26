const express = require("express");
const router = express.Router();

// authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// answer controllers
const { answerQuestion, getAnswerPage } = require("../controller/answerController");

// router.get("/get-answer", authMiddleware, (req, res) => {
//     res.send("all answers");
//   });

// answer question controller
router.post("/answer-question", authMiddleware, answerQuestion);

// get answer controller
router.get("/get-answer/:questionid",authMiddleware,  getAnswerPage);


  module.exports = router;