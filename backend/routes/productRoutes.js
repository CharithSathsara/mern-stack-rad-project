const express = require('express');
const router = express.Router();
const {getProducts, setProduct, updateProduct, deleteProduct, } = require('../controller/productController')
const {protect} = require('../middleware/authMiddleware');

//get a product and set a product // since one path
router.route('/').get(protect, getProducts).post(protect, setProduct);

//update a product and delete a product // since one path
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;