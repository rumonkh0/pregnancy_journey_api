// const Post = require("../../../models/community/Post");
const { Post, Media } = require("../../../models/Association");
const asyncHandler = require("../../../middleware/async");
const Reaction = require("../../../models/community/Reaction");
const Comment = require("../../../models/community/Comment");
const PostMedia = require("../../../models/community/PostMedia");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const User = require("../../../models/User");
const ReactionType = require("../../../models/community/ReactionType");
const PostTopic = require("../../../models/community/Post_topic");
// const Media = require("../../../models/Media");

// @desc      Get  Post List Of Mother
// @route     GET /api/v1/babylist
// @access    Private
exports.getAllPost = asyncHandler(async (req, res, next) => {
  return res.status(200).json(res.advancedResults);
});

// @desc      Get single post
// @route     GET /api/v1/babylist/:id
// @access    Private
exports.getPost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let post = await Post.findOne({
    where: { id },
    include: [
      { model: Media, attributes: ["id", "file_name", "file_path"] },

      {
        model: User,
        include: {
          model: Media,
          as: "media",
          attributes: ["id", "file_path", "file_name"],
        },
        attributes: ["id", "username", "first_name", "last_name"],
        require: false,
      },
      // {
      //   model: Reaction,
      //   include: [
      //     { model: User, attributes: ["id", "username"] },
      //     { model: ReactionType, attributes: ["type_name"] },
      //   ],
      // },
      {
        model: PostTopic,
        attributes: ["id", "title"],
      },
    ],
  });
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });

  // post = post.toJSON();
  // post.react = await Reaction.findOne({
  //   where: { user_id: req.user.id, post_id: req.params.id },
  // });

  res.status(200).json({
    success: true,
    message: "Post found",
    data: post,
  });
});

// @desc      Create post
// @route     POST /api/v1/babylist
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const postData = req.body;
  // postData.user_id = req.user.id;
  let post = await Post.create(postData);
  req.files.forEach(async (element) => {
    const { mimetype, filename, path: file_path, size, originalname } = element;

    let postMedia = {
      uploaded_by: req.admin.username,
      file_path,
      mime_type: mimetype,
      file_size: size,
      file_name: filename,
      original_name: originalname,
      file_type: path.extname(filename).slice(1),
    };
    let media = await Media.create(postMedia);
    await PostMedia.create({
      post_id: post.id,
      media_id: media.id,
    });
  });

  const fpost = await Post.findOne({
    where: { id: post.id },
    include: [{ model: Media, attributes: ["id", "file_name", "file_path"] }],
  });

  return res
    .status(200)
    .json({ success: true, message: "post created", data: fpost });
});

// @desc      Update post
// @route     PUT /api/v1/babylist/:id
// @access    Private
exports.updatePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  const updated = await Post.update(newData, {
    where: { id },
  });
  if (!updated[0])
    return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ message: "Post updated" });
});

// @desc      Delete post
// @route     DELETE /api/v1/babylist/:id
// @access    Private/Admin
exports.deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findByPk(id, {
    include: {
      model: Media,
      attributes: ["id", "file_path"],
    },
  });
  // const plain = post.toJSON();
  // console.log(plain.Media);

  await Promise.all(
    post.Media.map(async (media) => {
      // const ll = await fs.access(media.file_path);
      // console.log(ll);
      if (fs.existsSync(media.file_path)) {
        await unlinkAsync(media.file_path);
      }
      await PostMedia.destroy({ where: { media_id: media.id } });
      await Media.destroy({ where: { id: media.id } });
    })
  );

  const deleted = await Post.destroy({
    where: { id },
  });
  if (!deleted)
    return res.status(404).json({ success: false, message: "Post not found" });
  res.json({ message: "Post deleted" });
});
