const { Sequelize } = require("sequelize");

let sequelize;

sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    post: 3306,
    dialect: "mysql",
    dialectModule: require('mysql2'),
    logging: false,
  }
);

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
