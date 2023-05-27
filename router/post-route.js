const Router = require("express").Router;
const postController = require("../controllers/post-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../multer");

const router = new Router();

router.post(
  "/",
  upload.array("images"),
  authMiddleware,
  postController.createPost
);

router.put(
  "/:id",
  upload.array("images"),
  authMiddleware,
  postController.updatePost
);

router.patch(
  "/:id",
  upload.array("images"),
  authMiddleware,
  postController.patchPost
);

router.get("/", authMiddleware, postController.getAllPosts);
router.get("/:id", authMiddleware, postController.getOnePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;