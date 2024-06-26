// db connection
const dbConnection = require("../db/dbConfig");

// importing bcrypt module to use password protection
const bcrypt = require("bcrypt");

//error code writing instead of just numbers(codes)
const { StatusCodes } = require("http-status-codes");

// tool to create a token
const jwt = require("jsonwebtoken");

// registration page controller
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  // validation
  if (!email || !firstname || !lastname || !username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields!" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid FROM users WHERE username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered!" });
    }
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be atleast 8 characters!" });
    }

    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user registered successful!" });
  } catch (error) {
    //   console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, check your server again!" });
  }
}

// login page controller
async function login(req, res) {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields!" });
  }
  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );
    // return res.json({ user: user})
    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid user credentials!" });
    }
    // else {
    //   res.json("user existed")
    // }
    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid password credentials!" });
    }
    // return res.json({ user: user[0].password })

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "30days",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful!", token, username });

    // return res.json({ user: user[0].password });
  } catch (error) {
    //   console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try your server again!" });
  }
}

// user controller
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  // res.send("check user");
  res.status(StatusCodes.OK).json({ msg: "valid user!", username, userid });
}

module.exports = { register, login, checkUser };
