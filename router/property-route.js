const Router = require("express").Router;
const propertyController = require("../controllers/property-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const upload = require("../multer");

const router = new Router();

router.post(
  "/",
  upload.array("images"),
  authMiddleware,
  propertyController.createProperty
);

// router.put(
//   "/:id",
//   upload.array("images"),
//   authMiddleware,
//   propertyController.updatePost
// );

// router.patch(
//   "/:id",
//   upload.array("images"),
//   authMiddleware,
//   propertyController.patchPost
// );

// router.get("/", authMiddleware, propertyController.getAllPosts);
// router.get("/:id", authMiddleware, propertyController.getOnePost);
// router.delete("/:id", authMiddleware, propertyController.deletePost);

module.exports = router;