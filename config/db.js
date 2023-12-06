const { Sequelize } = require("sequelize");

// Initialize Sequelize with MySQL connection parameters

let sequelize;

if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      post: 3306,
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "private/data.sqlite",
  });
}
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
