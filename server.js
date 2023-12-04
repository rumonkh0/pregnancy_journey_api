const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config/config.env" });

const { setupDbConnection } = require("./config/db");

//Establish database connection
setupDbConnection();

//Route files
const auth = require("./app/routes/auth");
const users = require("./app/routes/users");
const babyList = require("./app/routes/baby");
const babygallery = require("./app/routes/baby_care/baby_gallery");
const babyFeed = require("./app/routes/baby_care/baby_feed");
const babyDiaper = require("./app/routes/baby_care/baby_diaper");
const babySymptom = require("./app/routes/baby_care/baby_symptom");
const breastPump = require("./app/routes/baby_care/baby_breast_pumping");
const babySleep = require("./app/routes/baby_care/baby_sleep");
const babyTemp = require("./app/routes/baby_care/baby_temperature");
const allHistory = require("./app/routes/baby_care/allHistory");

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/babylist", babyList);
app.use("/api/v1/babygallery", babygallery);
app.use("/api/v1/babyfeed", babyFeed);
app.use("/api/v1/diaper", babyDiaper);
app.use("/api/v1/symptom", babySymptom);
app.use("/api/v1/breastpump", breastPump);
app.use("/api/v1/sleep", babySleep);
app.use("/api/v1/temp", babyTemp);
app.use("/api/v1/allhistory", allHistory);
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Hello from pregnancy journey!" });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
