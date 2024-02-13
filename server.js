const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

const { setupDbConnection } = require("./config/db");

//Establish database connection
setupDbConnection();

//Route files
const auth = require("./app/routes/auth");
const users = require("./app/routes/admin/users");
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
const kickCounter = require("./app/routes/tools/mother/baby_kick_counter");
const mweight = require("./app/routes/tools/mother/weight");
const activity = require("./app/routes/tools/mother/mother_activity");
const antenatalVisit = require("./app/routes/tools/mother/antenatal_visit");
const postnatalVisit = require("./app/routes/tools/mother/postnatal_visit");
const mood = require("./app/routes/tools/mother/mother_mood");
const note = require("./app/routes/tools/mother/note");
const reactionType = require("./app/routes/community/reactionType");
const post = require("./app/routes/community/post");
const comment = require("./app/routes/community/comment");
const reaction = require("./app/routes/community/reaction");
const general = require("./app/routes/general");
const bpTracker = require("./app/routes/tools/mother/bpTracker");
const helpDesk = require("./app/routes/helpDesk");

//admin section
const admins = require("./app/routes/admin/admin");
const adminLogin = require("./app/routes/admin/adminAuth");
const adminHelpDesk = require("./app/routes/admin/helpDesk");
const babyCare = require("./app/routes/admin/babyCare");

const app = express();

// Body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/api/v1/babytemp", babyTemp);
app.use("/api/v1/allhistory", allHistory);
// app.use("/api/v1/exercise", exercise);   //problem with admin functionality
app.use("/api/v1/childvaccination", cvaccination);
app.use("/api/v1/mother/vaccination", mvaccination);
app.use("/api/v1/mother/contraction", mcontraction);
app.use("/api/v1/mother/symptom", msymptom);
app.use("/api/v1/mother/bptracker", bpTracker);
app.use("/api/v1/mother/drugreminder", drugReminder);
app.use("/api/v1/tools/mother/babykick", kickCounter);
app.use("/api/v1/mother/weight", mweight);
app.use("/api/v1/mother/activity", activity);
app.use("/api/v1/mother/antenatalvisit", antenatalVisit);
app.use("/api/v1/mother/mood", mood);
app.use("/api/v1/mother/postnatalvisit", postnatalVisit);
app.use("/api/v1/mother/note", note);
app.use("/api/v1/reactiontype", reactionType);
app.use("/api/v1/post", post);
app.use("/api/v1/comment", comment);
app.use("/api/v1/reaction", reaction);
app.use("/api/v1/general", general);
app.use("/api/v1/helpdesk", helpDesk);

//admin section
app.use("/admin/api/v1/auth", adminLogin);
app.use("/admin/api/v1/users", users);
app.use("/admin/api/v1/helpdesk", adminHelpDesk);
app.use("/admin/api/v1/admin", admins);
app.use("/admin/api/v1/babycare", babyCare);

// app.use("/api/v1/reaction", reaction);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to pregnancy journey from Woms teams!",
    postman_link:
      "https://www.postman.com/rumonkh/workspace/pregnancy-journey/collection/24171225-9014a46a-34b4-4730-875a-405927b0d2f6?action=share&creator=24171225&active-environment=24171225-b92ee913-3a18-407c-960d-0732518232a6",
    User_documentation:
      "https://documenter.getpostman.com/view/24171225/2s9YeLXUWU#014b9f1f-d394-47c0-a5fd-dddc5489c67a",
    Admin_documentation:
      "https://documenter.getpostman.com/view/24171225/2sA2r3YkSb",
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message} \nfull error:${err}`);
// Close server & exit process
// server.close(() => process.exit(1));
// });
