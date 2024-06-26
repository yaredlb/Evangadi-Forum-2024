// uuid
const { v4: uuidv4 } = require('uuid');


// db connection
const dbConnection = require("../db/dbConfig");

//error code writing instead of just numbers(codes)
const { StatusCodes } = require("http-status-codes");

// ask question page controller
async function askQuestion(req, res) {
  const { username, userid } = req.user;
  const questionid = uuidv4();
  const { title, description} = req.body;
  // validation
  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please fill all fields!" });
  }
  try {
    await dbConnection.query(
      "INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [ questionid, userid, title, description]
    );
    return res
      .status(StatusCodes.OK)
      .json({ msg: "ask question succesful!", username });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "ask question failed, check your server again!" });
  }
}

// get all questions page controller
async function getAllQuestions(req, res) {
  try {
    const [results] = await dbConnection.query(
      "SELECT questions.*, users.username, users.userid FROM questions INNER JOIN users ON questions.userid = users.userid ORDER BY questions.title DESC"
    );
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "get all questions failed, check your server again!" });
  }
}

// detail question page controller
async function getQuestionDetail(req, res) {
  try {
    const { questionid } = req.query;
    const [results] = await dbConnection.query(
      "SELECT questionid, title, description, tag FROM questions WHERE questionid = ?",
      [questionid]
    );
    if (results.length > 0) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "question not found!" });
    }
  } catch (error) {
    // console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "get all questions failed, check your server again!" });
  }
}

module.exports = { askQuestion, getAllQuestions, getQuestionDetail };
