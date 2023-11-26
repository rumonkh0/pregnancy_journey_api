const crypto = require("crypto");
const { sequelize } = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    poto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    child_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    edd_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pregnency_loss: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    baby_already_born: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    login_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "email=1 google=2 facebook=2 twitter=2",
    },
    user_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "general_user",
    },
    subscription: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password_reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    confirm_email_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lmp_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users", // Make sure to set the table name if it differs
    timestamps: true, // Set to true if timestamps are managed by Sequelize (createdAt, updatedAt)

    hooks: {
      // Before creating a new user, hash the password
      beforeCreate: async (user) => {
        if (user.password) {
          console.log("password hassing..............");
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      },
    },
  }
);

// Method to verify password
User.prototype.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

//Method for sign in with jwt token
User.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password token
User.prototype.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  // this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Method to find a user by username
User.findByUsername = async function (username) {
  return this.findOne({ where: { username } });
};

module.exports = User;
