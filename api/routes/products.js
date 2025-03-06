const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require('../middleware/chek-auth');
const productsContoller = require('../controllers/products')

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)    //accept a file
  } else {
    cb(null, false)
  } //reject a file

}

const upload = multer({
  storage: storage, limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// GET all products
router.get("/", productsContoller.products_get_products);

// POST a new product
router.post("/", checkAuth, upload.single("productImage"), productsContoller.products_create_product);

// GET product by ID
router.get("/:productId", productsContoller.products_get_product);

// PATCH update a product
router.patch("/:productId", checkAuth, productsContoller.products_update_product);

// DELETE a product
router.delete("/:productId", checkAuth, productsContoller.products_delete_product);

module.exports = router;
