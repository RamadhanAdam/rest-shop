const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {

  Product.find()
    .select('name price_id')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            url: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc.id
            }
          }
        })
      }
      // if(docs.length >= 0){
      res.status(200).json(response);
      // } else {
      //   res.status(400).json({
      //     message: "No entries found"
      //   });
      // }

    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfuly",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: 'http://localhost:3000/products/' + result._id
          }
        },
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        err: err
      })
    }); //chains into a promise
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name price_id')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: 'GET_ALL_PRODUCTS',
            url: 'http://localhost:3000/products/'
          }
        })
      } else {
        res.status(404).json({
          message: `No valid entry found for ID : ${id}`
        })
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        type: "GET",
        url: 'http://localhost:3000/products/' + id
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })

});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "product deleted",
        request: {
        type: "POST",
        url: 'http://localhost:3000/products/',
        body : {name : "String", price : "Number"}
      }

      });
})
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;
