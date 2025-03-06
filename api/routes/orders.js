const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/chek-auth')

// GET all orders
router.get('/',checkAuth, (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name price')// Populate the product field with the actual product data
        .exec()  
        .then(orders => {
            res.status(200).json({
                count: orders.length,
                orders: orders.map(doc => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    }
                })

            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

router.post('/',checkAuth, (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                    error: { message: "Product with the given ID does not exist" }
                });
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),  // Use 'new' to create a new ObjectId
                product: productId,                  // Use the product ID from the request body
                quantity: req.body.quantity          // Use the quantity from the request body
            });

            return order
                .save()
        })
        .then(result => {
            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/orders/" + result._id
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });  // Send a more user-friendly error message
        });
});

// GET a specific order by ID
router.get('/:orderId',checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .select('_id name price')
        .populate('product', 'name price') // Populate the product field with the actual product data
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json({
                    _id: order._id,
                    quantity: order.quantity,
                    product: order.product,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/orders"
                    }
                });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

// DELETE a specific order by ID
router.delete('/:orderId',checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;

    Order.findByIdAndDelete(orderId)
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json({
                    message: 'Order deleted for id' + orderId,
                    request: {
                        type: 'POST',
                        url: "http://localhost:3000/orders",
                        body: { productId: "ID", quantity: "Number" }

                    }
                });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;