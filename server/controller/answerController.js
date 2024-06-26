// db connection
const dbConnection = require("../db/dbConfig");

//error code writing instead of just numbers(codes)
const { StatusCodes } = require("http-status-codes");

// answer the question controller
async function answerQuestion(req, res) {
  try {
    const { userid } = req.user;
    const { questionid, answer } = req.body;

    // validation
    if (answer.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "answer cannot be empty!" });
    }
    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (? , ?, ?)",
      [userid, questionid, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "answer submitted successfully!" });
  } catch (error) {
    // console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "answer submit failed, check your server again!" });
  }
}

// get answer page controller
async function getAnswerPage(req, res) {
    try {
        const { questionid } = req.params;
        const [results] = await dbConnection.query(
            `SELECT users.*, answers.* FROM users INNER JOIN answers ON users.userid = answers.userid WHERE answers.questionid = ? ORDER BY  answers.answerid DESC`,[questionid]
            );
            return res.status(StatusCodes.OK).json(results);
    } catch (error) {
        console.log(error);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ msg: "get answer failed, check your server again!" });
      }
}

module.exports = { answerQuestion, getAnswerPage };
