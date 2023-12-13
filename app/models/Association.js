const Post = require('./models/post');
const Media = require('./models/media');
const PostMedia = require('./models/postMedia');

// Define associations
Post.belongsToMany(Media, { through: PostMedia });
Media.belongsToMany(Post, { through: PostMedia });

PostMedia.belongsTo(Post, { foreignKey: 'post_id' });
PostMedia.belongsTo(Media, { foreignKey: 'media_id' });

module.exports = { Post, Media, PostMedia };
