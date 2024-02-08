const Post = require("./community/Post");
const Media = require("./Media");
const PostMedia = require("./community/PostMedia");
// const Admin = require("./Admin");
// const Role = require("./Role");
// const AdminRole = require("./AdminRole");

// Define associations

Post.belongsToMany(Media, { through: PostMedia, foreignKey: "post_id" });
Media.belongsToMany(Post, { through: PostMedia, foreignKey: "media_id" });

// Admin.belongsToMany(Role, { through: AdminRole, foreignKey: "admin_id" });
// Role.belongsToMany(Admin, { through: AdminRole, foreignKey: "role_id" });

// PostMedia.belongsTo(Post, { foreignKey: "post_id" });
// PostMedia.belongsTo(Media, { foreignKey: "media_id" });
module.exports = { Post, Media, PostMedia };
