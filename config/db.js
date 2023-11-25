const mysql = require("mysql");

// Database connection configuration
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DATABASE,
});

//Create a function to connect asynchronously
const setupDbConnection = () => {
  try {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL: ", err);
        return;
      }
      console.log("Connected to MySQL database!");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = { connection, setupDbConnection };

// const mysql = require("mysql");

// //database connection configuration
// const con = mysql.createConnection({
//   host: "process.enc.HOST",
//   user: "process.enc.USER",
//   password: "process.enc.PASSWORD",
//   database: "process.enc.DATABASE",
// });

// // Create a function to connect asynchronously
// const connectToDatabase = async () => {
//   const connection = await con.connect;
//   console.log("Connected to MySQL database!");
// };
// module.exports = connectToDatabase;
// // module.exports = { connectToDatabase, con };
