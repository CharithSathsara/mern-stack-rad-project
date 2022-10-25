const express = require('express');
const router = express.Router();
const {getCustomers, setCustomer, updateCustomer, deleteCustomer, } = require('../controller/customerController')
const {protect} = require('../middleware/authMiddleware');

//get a customer and set a customer // since one path
router.route('/').get(protect, getCustomers).post(protect, setCustomer);

//update a customer and delete a customer // since one path
router.route('/:id').put(protect, updateCustomer).delete(protect, deleteCustomer);

module.exports = router;