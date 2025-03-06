const Product = require("../models/product");
const mongoose = require("mongoose");

exports.products_get_products = (req, res) => {
  Product.find()
    .select("name price productImage") // Fix: Use correct field names
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => ({
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          _id: doc._id,
          url: {
            type: "GET",
            url: `http://localhost:3000/products/${doc._id}`,
          },
        })),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}

exports.products_create_product = (req, res) => {
  console.log(req.file);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: `http://localhost:3000/products/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}

exports.products_get_product = (req, res) => {
  Product.findById(req.params.productId)
    .select("name price productImage")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "GET_ALL_PRODUCTS",
            url: "http://localhost:3000/products/",
          },
        });
      } else {
        res.status(404).json({ message: `No valid entry found for ID: ${req.params.productId}` });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}

exports.products_update_product = (req, res) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: req.params.productId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: `http://localhost:3000/products/${req.params.productId}`,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}

exports.products_delete_product = (req, res) => {
  Product.deleteOne({ _id: req.params.productId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products/",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
}