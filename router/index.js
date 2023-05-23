const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../multer");


router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/users/:id", authMiddleware, userController.getSingleUser);

router.post(
  "/posts",
  upload.array("images"),
  authMiddleware,
  postController.createPost
);
router.put(
  "/posts/:id",
  upload.array("images"),
  authMiddleware,
  postController.updatePost
);
router.patch(
  "/posts/:id",
  upload.array("images"),
  authMiddleware,
  postController.patchPost
);
router.get("/posts", authMiddleware, postController.getAllPosts);
router.get("/posts/:id", authMiddleware, postController.getOnePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

module.exports = router;
