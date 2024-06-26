require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// question routes middleware file
const questionRoutes = require("./routes/questionRoute");

// answer routes middleware file
const answerRoutes = require("./routes/answerRoute");

// authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
// a middleware built to parse the incoming requests
app.use(express.urlencoded({ extended: true }));
// json middleware to extract json data
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);
// app.use("/api/users", authMiddleware, userRoutes);

// question routes middleware
app.use("/api/questions", questionRoutes);
// app.use("/api/questions", authMiddleware, questionRoutes);

// answers routes middleware
app.use("/api/answers", answerRoutes);
// app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("database connection established");
    // console.log(result)
    console.log(`server running on port ${port} `);
  } catch (error) {
    console.log(error.message);
  }
}
start();
