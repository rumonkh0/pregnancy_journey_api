const { Sequelize } = require("sequelize");

// Initialize Sequelize with MySQL connection parameters
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   // storage: "C:/Users/RUMON/Desktop/pregnancy_journey_api/private/data.sqlite",
//   storage: "private/data.sqlite",
// });

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
