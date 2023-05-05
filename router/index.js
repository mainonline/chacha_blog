const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const postController = require("../controllers/post-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

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
  authMiddleware,
  upload.array("images"),
  postController.createPost
);
router.put(
  "/posts/:id",
  authMiddleware,
  upload.array("images"),
  postController.updatePost
);
router.get("/posts", authMiddleware, postController.getAllPosts);
router.get("/posts/:id", authMiddleware, postController.getOnePost);
router.delete("/posts/:id", authMiddleware, postController.deletePost);

module.exports = router;
