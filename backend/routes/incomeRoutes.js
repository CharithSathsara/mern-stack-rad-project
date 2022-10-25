const express = require('express');
const router = express.Router();
const {getIncomes, setIncome, updateIncome, deleteIncome, } = require('../controller/incomeController')
const {protect} = require('../middleware/authMiddleware');

//get a income and set a income // since one path
router.route('/').get(protect, getIncomes).post(protect, setIncome);

//update a income and delete a income // since one path
router.route('/:id').put(protect, updateIncome).delete(protect, deleteIncome);

module.exports = router;