const { randomInt } = require("crypto");
const { sequelize } = require("../../config/db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const Media = require("./Media");
const { Post } = require("./Association");
const Reaction = require("./community/Reaction");
const Reply = require("./community/Reply");
const Comment = require("./community/Comment");
const deviceToken = require("./DeviceToken");
const HelpDesk = require("./HelpDesk");
const MotherDiet = require("./tools/mother/Mother_diet");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    social_id: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notContains: {
          args: " ",
          msg: "Username cannot contain spaces.",
        },
        is: {
          args: /^[a-zA-Z0-9_]+$/, // Only allow letters, numbers, and underscores
          msg: "Username must only contain letters, numbers, and underscores.",
        },
      },
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
    photo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    social_photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    child_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    edd_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    edd_calculation_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        len: {
          args: [6],
          msg: "The password length should be at least 6 characters.",
        },
      },
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pregnancy_loss: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pregnancy_loss_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    baby_already_born: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    login_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "email=1 google=2 facebook=2 twitter=2",
      defaultValue: "email",
    },
    user_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "general_user",
    },
    subscription: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password_reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reset_password_expire: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    confirm_email_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_email_confirmed: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: "0",
    },
    is_profile_complete: {
      type: DataTypes.STRING(225),
      allowNull: false,
      defaultValue: "0",
    },
    lmp_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0",
    },
    deleted_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
    tableName: "users",
    timestamps: true,

    hooks: {
      // Before creating a new user, hash the password
      beforeCreate: async (user) => {
        if (user.password) {
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
    defaultScope: {
      // Excludes the 'password' field by default from all queries
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        // Include 'password' field when this scope is used
        attributes: { include: ["password"] },
      },
    },
  }
);

// Method to verify password
User.prototype.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to verify OTP
User.prototype.verifyOTP = function (OTP) {
  return bcrypt.compare(OTP, this.password_reset_token);
};

//Method for sign in with jwt token
User.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id, type: "user" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate and hash password token
// User.prototype.getResetPasswordToken = function () {
//   // Generate token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   // Hash token and set to resetPasswordToken field
//   this.password_reset_token = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // Set expire
//   this.reset_password_expire = new Date() + 10 * 60 * 1000;

//   return resetToken;
// };

//generate OTP
User.prototype.getOTP = async function (next) {
  // Generate token
  const OTP = String(randomInt(1000, 9999));

  const saltRounds = 10;
  const hashedOTP = await bcrypt.hash(OTP, saltRounds);

  // Hash token and set to resetPasswordToken field
  this.password_reset_token = hashedOTP;

  // Set expire
  this.reset_password_expire = new Date() + 10 * 60 * 1000;

  return OTP;
};

User.prototype.generateEmailConfirmToken = function (next) {
  // email confirmation token
  const confirmationToken = crypto.randomBytes(20).toString("hex");

  this.confirm_email_token = crypto
    .createHash("sha256")
    .update(confirmationToken)
    .digest("hex");

  const confirmTokenExtend = crypto.randomBytes(100).toString("hex");
  const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
  return confirmTokenCombined;
};

// Method to find a user by username
User.findByUsername = async function (username) {
  return this.findOne({ where: { username } });
};

User.belongsTo(Media, { as: "media", foreignKey: "photo" });
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Reaction, { foreignKey: "user_id" });
Reaction.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Reply, { foreignKey: "user_id" });
Reply.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(deviceToken, { foreignKey: "user_id" });
deviceToken.belongsTo(User, { foreignKey: "user_id" });
MotherDiet.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(MotherDiet, { foreignKey: "user_id" });
User.hasMany(HelpDesk, { foreignKey: "user_id" });
HelpDesk.belongsTo(User, { foreignKey: "user_id" });

module.exports = User;
