const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

// Route to get all users
router.get("/", userController.getAllUsers);
router.post("/login", userController.loginUser);

// Route to get a user by ID
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UsersModel.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Route to create a new user
router.post("/", async (req, res) => {
  const userData = req.body; // Assuming data comes in as JSON in the request body
  try {
    const newUserId = await UsersModel.createUser(userData);
    res.status(201).json({ message: "User created", userId: newUserId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route to update a user by ID
router.put("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body; // Assuming data comes in as JSON in the request body
  try {
    const updated = await UsersModel.updateUserById(userId, newData);
    if (!updated) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// Route to delete a user by ID
router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const deleted = await UsersModel.deleteUserById(userId);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
