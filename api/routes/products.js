const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  res.status(201).json({
    message: "handling POST requests to /products",
    createdProduct: product,
  });
});

router.get("/:productId", (req, res, next) => {
  if (id === "special") {
    res.status(200).json({
      message: "You discovered a special ID",
      id: req.params.productId,
    });
  } else {
    res.status(200).json({
      message: " You passed an ID",
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "updated product!",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
