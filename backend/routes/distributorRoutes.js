const express = require('express');
const router = express.Router();
const { getDistributors, setDistributor, updateDistributor, deleteDistributor, } = require('../controller/distributorController')
const { protect } = require('../middleware/authMiddleware');

//get a distributor and set a distributor // since one path
router.route('/').get(protect, getDistributors).post(protect, setDistributor);

//update a distributor and delete a distributor // since one path
router.route('/:id').put(protect, updateDistributor).delete(protect, deleteDistributor);

module.exports = router;