const { Sequelize } = require("sequelize");

// Initialize Sequelize with MySQL connection parameters
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, "", {
  host: "localhost", // or your MySQL server's host
  dialect: "mysql",
});

//Create a function to connect asynchronously
const setupDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, setupDbConnection };