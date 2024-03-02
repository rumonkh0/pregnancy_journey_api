const Post = require("./community/Post");
const Media = require("./Media");
const PostMedia = require("./community/PostMedia");
const DailyRead = require("./daily/Daily_read");
const DailyTip = require("./daily/Daily_tip");
const Blog = require("./blogs/Blog");
const MotherProgressTimeline = require("./progress_timeline/Mother_progress_timeline");
const BabyProgressTimeline = require("./progress_timeline/Baby_progress_timeline");
const WarningSign = require("./Warning_sign");
const BlogCategories = require("./blogs/Blog_category");
const Video = require("./Video");
// const Admin = require("./Admin");
// const Role = require("./Role");
// const AdminRole = require("./AdminRole");

// Define associations

Post.belongsToMany(Media, { through: PostMedia, foreignKey: "post_id" });
Media.belongsToMany(Post, { through: PostMedia, foreignKey: "media_id" });

// Admin.belongsToMany(Role, { through: AdminRole, foreignKey: "admin_id" });
// Role.belongsToMany(Admin, { through: AdminRole, foreignKey: "role_id" });

DailyRead.belongsTo(Media, { foreignKey: "image", as: "media" });
DailyTip.belongsTo(Media, { foreignKey: "image", as: "media" });
Blog.belongsTo(Media, { foreignKey: "image", as: "media" });
MotherProgressTimeline.belongsTo(Media, { foreignKey: "image", as: "media" });
BabyProgressTimeline.belongsTo(Media, { foreignKey: "image", as: "media" });
WarningSign.belongsTo(Media, { foreignKey: "image", as: "media" });
BlogCategories.belongsTo(Media, { foreignKey: "image", as: "media" });
// Video.belongsTo(Media, { foreignKey: "image", as: "media" });

// PostMedia.belongsTo(Post, { foreignKey: "post_id" });
// PostMedia.belongsTo(Media, { foreignKey: "media_id" });
module.exports = { Post, Media, PostMedia };
