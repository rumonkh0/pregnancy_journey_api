const Post = require("./community/Post");
const Media = require("./Media");
const PostMedia = require("./community/PostMedia");

// Define associations

Post.belongsToMany(Media, { through: PostMedia, foreignKey: "post_id" });
Media.belongsToMany(Post, { through: PostMedia, foreignKey: "media_id" });

// PostMedia.belongsTo(Post, { foreignKey: "post_id" });
// PostMedia.belongsTo(Media, { foreignKey: "media_id" });
module.exports = { Post, Media, PostMedia };
