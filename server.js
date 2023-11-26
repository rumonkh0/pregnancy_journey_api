const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

const { setupDbConnection } = require("./config/db");

//Establish database connection
setupDbConnection();

//Route files
const auth = require("./app/routes/auth");
const users = require("./app/routes/users");

const app = express();

// Body parser
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

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
