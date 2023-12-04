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
// const exercise = require("./app/routes/exercise");
const cvaccination = require("./app/routes/vaccination/child_vaccination");
const mvaccination = require("./app/routes/vaccination/mother_vaccination");
const mcontraction = require("./app/routes/tools/mother/mother_contraction_time");
const msymptom = require("./app/routes/tools/mother/mother_symptom");
const drugReminder = require("./app/routes/tools/mother/drug_reminder");

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
// app.use("/api/v1/exercise", exercise);   //problem with admin functionality
app.use("/api/v1/childvaccination", cvaccination);
app.use("/api/v1/mother/vaccination", mvaccination);
app.use("/api/v1/mother/contraction", mcontraction);
app.use("/api/v1/mother/symptom", msymptom);
app.use("/api/v1/mother/drugreminder", drugReminder);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello from pregnancy journey!",
    documentation:
      "https://documenter.getpostman.com/view/24171225/2s9YeLXUWU#014b9f1f-d394-47c0-a5fd-dddc5489c67a",
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
