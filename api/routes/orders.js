const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/chek-auth');


//importing controllers
const OrdersController = require('../controllers/orders');

// GET all orders
router.get('/', checkAuth, OrdersController.orders_get_all);

// CREATE AN ORDER
router.post('/', checkAuth, OrdersController.orders_create_order);

// GET a specific order by ID
router.get('/:orderId', checkAuth, OrdersController.orders_create_order);

// DELETE a specific order by ID
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;