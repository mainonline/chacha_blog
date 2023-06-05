const express = require("express");
const router = express.Router();
const userRoutes = require("./user-route");
const postRoutes = require("./post-route");
const layoutRoutes = require("./layout-route");
const propertyRoutes = require("./property-route");

// ...

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/layout", layoutRoutes);
router.use("/property", propertyRoutes);

// ...

module.exports = router;