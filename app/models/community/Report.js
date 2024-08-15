const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../../../config/db");

const Report = sequelize.define(
  "reports",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updatedAt",
    },
  },
  {
    tableName: "reports",
    timestamps: true,
    hooks: {
      afterSave: async (report) => {
        // console.log(report);
        post_id = report.post_id;
        comment_id = report.comment_id;
        report.post_id
          ? await getTotalReport(post_id, "post")
          : await getTotalReport(comment_id, "comment");
      },
    },
  }
);

// Method to get total report for a post or comment
const getTotalReport = async (id, type) => {
  try {
    // Calculate total report using Sequelize's aggregation functions

    const query = {
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("id")), "total_report"],
      ],
      raw: true,
    };
    type == "post"
      ? (query["where"] = { post_id: id })
      : (query["where"] = { comment_id: id });

    const result = await Report.findOne(query);

    // Update total report in post or comment model;
    type == "post"
      ? await sequelize.models.Post.update(
          { total_report: result.total_report },
          { where: { id } }
        )
      : await sequelize.models.Comment.update(
          { total_report: result.total_report },
          { where: { id } }
        );

    console.log("Total report updated successfully");
  } catch (err) {
    console.error("Error updating report:", err);
  }
};

module.exports = Report;
