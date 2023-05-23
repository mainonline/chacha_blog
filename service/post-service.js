const PostModel = require("../models/post-model");
const ApiError = require("../exceptions/api-error");
const cloudinary = require("../cloudinary");
const fs = require("fs");

class PostService {
  async create(data, user, files) {
    const post = await PostModel.create({ ...data, author: user.id });

    if (files && files.length > 0) {
      const urls = [];
      for (const file of files) {
        const { path } = file;
        const { url, id } = await cloudinary.uploads(path, "estate");
        urls.push({ url, id });
        fs.unlinkSync(path);
      }
      post.images = urls;
    }
    await post.save();
    return post;
  }

  /* update method */
  async update(id, data, files) {
    console.log("update method data: ", data);
    const post = await PostModel.findById(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }

    // Delete existing images from Cloudinary
    if (post.images && post.images.length > 0) {
      for (const image of post.images) {
        await cloudinary.destroy(image.id);
      }
    }

    const updatedImages = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const { path } = file;
        const { url, id } = await cloudinary.uploads(path, "estate");
        updatedImages.push({ url, id });
        fs.unlinkSync(path);
      }
    }

    post.images = updatedImages;
    post.title = data.title;
    post.content = data.content;
    await post.save();
    return post;
  }

  /* patch method */
  async patch(id, data, files) {
    const post = await PostModel.findById(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }

    // Delete existing images from Cloudinary
    if (files && files.length > 0) {
      if (post.images && post.images.length > 0) {
        for (const image of post.images) {
          await cloudinary.destroy(image.id);
        }
      }
    }

    const updatedImages = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const { path } = file;
        const { url, id } = await cloudinary.uploads(path, "estate");
        updatedImages.push({ url, id });
        fs.unlinkSync(path);
      }
    }

    // Update post data
    post.title = data.title || post.title;
    post.content = data.content || post.content;
    post.images = updatedImages.length > 0 ? updatedImages : post.images;
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
    const post = await PostModel.findById(id);
    if (!post) {
      throw ApiError.NotFound("Post not found");
    }

    // Delete images from Cloudinary
    if (post.images && post.images.length > 0) {
      for (const image of post.images) {
        await cloudinary.destroy(image.id);
      }
    }

    await PostModel.deleteOne({ _id: id });
    return post;
  }
}

module.exports = new PostService();
