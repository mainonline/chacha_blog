require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const swaggerDocument = require("./swagger.json");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
app.use("/uploads", express.static("uploads"));
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
