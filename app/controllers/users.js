const userModel = require("../models/User");

// exports.geAlltUsers = async (req, res, next) => {
//   try {
//     const users = await userModel.getAllUsers();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getAllUsers: async (req, res) => {
    // Copy req.query
    const reqQuery = { ...req.query };
    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    console.log(queryStr);

    try {
      const users = await userModel.getAllUser(queryStr);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Add other controller methods for different functionalities
};

// const { connectToDatabase } = require('../../config/db');
// const UsersModel = require('../models/User');

// // Establish database connection
// connectToDatabase()
//   .then(() => {
//     // Fetch all users
//     UsersModel.getUsers()
//       .then((users) => {
//         console.log("Fetched users:", users);
//         // Do something with the users data
//       })
//       .catch((err) => {
//         console.error("Error fetching users:", err);
//       });

//     // Fetch a user by ID (example)
//     const userId = 1;
//     UsersModel.getUserById(userId)
//       .then((user) => {
//         console.log("Fetched user:", user);
//         // Do something with the user data
//       })
//       .catch((err) => {
//         console.error("Error fetching user:", err);
//       });
//   })
//   .catch((error) => {
//     console.error("Error connecting to database:", error);
//   });

// // const asyncHandler = require("../middleware/async");
// // const { con } = require("../../config/db");
// // // const { connect } = require("../routes/users");

// // // @desc      Get all users
// // // @route     GET /api/v1/users
// // // @access    Private/Admin
// // exports.getUsers = asyncHandler(async (req, res, next) => {
// //   const q = "select * from pregnancy_journey";
// //   con.query(q);
// // });

// // // @desc      Get single user
// // // @route     GET /api/v1/users/:id
// // // @access    Private/Admin
// // exports.getUser = asyncHandler(async (req, res, next) => {
// //   const user = await User.findById(req.params.id);

// //   res.status(200).json({
// //     success: true,
// //     data: user,
// //   });
// // });

// // // @desc      Create user
// // // @route     POST /api/v1/users
// // // @access    Private/Admin
// // exports.createUser = asyncHandler(async (req, res, next) => {
// //   const user = await User.create(req.body);

// //   res.status(201).json({
// //     success: true,
// //     data: user,
// //   });
// // });

// // // @desc      Update user
// // // @route     PUT /api/v1/users/:id
// // // @access    Private/Admin
// // exports.updateUser = asyncHandler(async (req, res, next) => {
// //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
// //     new: true,
// //     runValidators: true,
// //   });

// //   res.status(200).json({
// //     success: true,
// //     data: user,
// //   });
// // });

// // // @desc      Delete user
// // // @route     DELETE /api/v1/users/:id
// // // @access    Private/Admin
// // exports.deleteUser = asyncHandler(async (req, res, next) => {
// //   await User.findByIdAndDelete(req.params.id);

// //   res.status(200).json({
// //     success: true,
// //     data: {},
// //   });
// // });
