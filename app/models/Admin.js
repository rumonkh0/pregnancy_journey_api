// Import Sequelize and connection
const { sequelize } = require("../../config/db");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const Media = require("./Media");
const Role = require("./Role");
const AdminRole = require("./AdminRole");
const MotherDiet = require("./tools/mother/Mother_diet");

// Define the Admin model
const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Media", // Name of the referenced model
        key: "id", // Name of the referenced key
      },
      onDelete: "CASCADE", // Cascade delete when the referenced media is deleted
    },
  },
  {
    tableName: "admins",
    timestamps: true,
    hooks: {
      // Before creating a new user, hash the password
      beforeCreate: async (admin) => {
        if (admin.password) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
          admin.password = hashedPassword;
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.changed("password")) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
          admin.password = hashedPassword;
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

Admin.belongsTo(Media, { as: "profile_photo", foreignKey: "photo" });

// Method to verify password
Admin.prototype.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

//Method for sign in with jwt token
Admin.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id, type: "admin" }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

Admin.belongsToMany(Role, { through: AdminRole, foreignKey: "admin_id" });
Role.belongsToMany(Admin, { through: AdminRole, foreignKey: "role_id" });

MotherDiet.belongsTo(Admin, { foreignKey: "admin_id" });
Admin.hasMany(MotherDiet, { foreignKey: "admin_id" });

Admin.prototype.toJSON = function () {
  const values = { ...this.get() };

  if (values.Roles) {
    values.roles = values.Roles.map((role) => role.role);
    delete values.Roles;
  }

  return values;
};

module.exports = Admin;
