const Router = require("express").Router;
const LayoutController = require("../controllers/layout-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/:id", authMiddleware, LayoutController.getSingleLayout);
router.patch("/", authMiddleware, LayoutController.updateLayout);

module.exports = router;