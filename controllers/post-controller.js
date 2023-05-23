const postService = require("../service/post-service");
const ApiError = require("../exceptions/api-error");

class PostController {
  async createPost(req, res, next) {
    try {
      const data = req.body;
      const files = req.files;
      const user = req.user;
      const post = await postService.create(data, user, files);
      res.json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      const data = req.body;
      const user = req.user;
      const { id } = req.params;
      const files = req.files;

      const singlePost = await postService.getOne(id);

      if (singlePost.author.toString() !== user.id) {
        return next(ApiError.Forbidden("You are not the author of this post"));
      }

      const updatedPost = await postService.update(id, data, files);
      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async patchPost(req, res, next) {
    try {
      const data = req.body;
      const user = req.user;
      const { id } = req.params;
      const files = req.files;

      const singlePost = await postService.getOne(id);

      if (singlePost.author.toString() !== user.id) {
        return next(ApiError.Forbidden("You are not the author of this post"));
      }

      const updatedPost = await postService.patch(id, data, files);
      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const posts = await postService.getAll(page, limit);
      res.json(posts);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getOnePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.getOne(id);
      res.json(post);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;

      const post = await postService.getOne(id);
      if (post.author.toString() !== user.id) {
        return next(ApiError.Forbidden("You are not the author of this post"));
      }
      await postService.delete(id);
      res.json({ message: "Post deleted" });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = new PostController();
