const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require('./api/routes/user')

mongoose.connect(
  "mongodb+srv://Almeida:" +
    process.env.MONGO_ATLAS_PW +
    "@shop-node.nn46v.mongodb.net/?retryWrites=true&w=majority&appName=shop-node"
//     ,
//   {
//     useMongoclient : true
//   }
);

app.use(morgan("dev"));
app.use(express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, X-Requested-With, Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Routes which should handle requests - Middleware
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
