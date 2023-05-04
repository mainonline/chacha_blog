const PostModel = require("../models/post-model");
const ApiError = require("../exceptions/api-error");

class PostService {
  async create(data, user, files) {
    const post = await PostModel.create({ ...data, author: user.id });
    if (files && files.length > 0) {
      console.log("files:", files);
      const imagePaths = files.map((file) => file.path);
      post.images = imagePaths;
    }
    await post.save();
    return post;
  }

  async update(id, data, files) {
    const post = await PostModel.findById(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }
    Object.assign(post, data);
    if (files && files.length > 0) {
      const imagePaths = files.map((file) => file.path);
      post.images = imagePaths;
    }
    await post.save();
    return post;
  }

  async getAll(page, limit) {
    const skip = (page - 1) * limit;
    const [posts, totalCount] = await Promise.all([
      PostModel.find().skip(skip).limit(limit).sort({ date: -1 }),
      PostModel.countDocuments(),
    ]);
    const totalPages = Math.ceil(totalCount / limit);
    return {
      posts,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
    };
  }

  async getOne(id) {
    const post = await PostModel.findById(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }
    return post;
  }

  async delete(id) {
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }
    return post;
  }
}

module.exports = new PostService();
