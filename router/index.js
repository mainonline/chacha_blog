const express = require("express");
const router = express.Router();
const userRoutes = require("./user-route");
const postRoutes = require("./post-route");
const layoutRoutes = require("./layout-route");

// ...

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/layout", layoutRoutes);

// ...

module.exports = router;