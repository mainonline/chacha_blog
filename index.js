require("dotenv").config();
const os = require("os");
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//dotenv
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  accessControlAllowOrigin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use("/", router);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
