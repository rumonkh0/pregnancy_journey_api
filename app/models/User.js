const { connection } = require('../../config/db')


// Function to get all users from the database
const getAllUser = (queryStr) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user", (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

// Function to get a user by ID
const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results[0]); // Assuming expecting one user or null
      }
    );
  });
};

// Function to create a new user
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users SET ?", userData, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results.insertId); // Return the ID of the newly inserted user
    });
  });
};

// Function to update a user by ID
const updateUserById = (userId, newData) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
      [newData, userId],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows > 0); // Resolves true if user was updated, false otherwise
      }
    );
  });
};

// Function to delete a user by ID
const deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM users WHERE id = ?",
      [userId],
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows > 0); // Resolves true if user was deleted, false otherwise
      }
    );
  });
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
