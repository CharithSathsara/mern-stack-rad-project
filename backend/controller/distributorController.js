const asyncHandler = require('express-async-handler');
const Distributor = require('../models/distributor');


//@description - Get all distributor
//@route - GET /api/distributor
//@access private
const getDistributors = asyncHandler(async (req, res) => {

    console.log("getting distributors from back end");
    const distributor = await Distributor.find({ user: req.user.id });
    res.status(200).json(distributor);
});

//@description - Update distributor
//@route - POST /api/distributor
//@access private
const setDistributor = asyncHandler(async (req, res) => {

    if (!req.body.name) {

        res.status(400);
        throw new Error('Please add a distributor name field');
    }

    if (!req.body.product) {
        res.status(400);
        throw new Error('Please add a distributor product field');
    }

    if (!req.body.address) {
        res.status(400);
        throw new Error('Please add a distributor address field');
    }

    const distributor = await Distributor.create({
        name: req.body.name,
        product: req.body.product,
        address: req.body.address,

        //relationship
        user: req.user.id
    })

    res.status(200).json(distributor);
});

//@description - Update distributor
//@route - PUT /api/distributors/:id
//@access private
const updateDistributor = asyncHandler(async (req, res) => {


    const distributor = await Distributor.findById(req.params.id);

    if (!distributor) {
        res.status(400);
        throw new Error('distributor not found');
    }


    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }


    //make sure the logged-in user matches the goal user
    if (distributor.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedDistributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedDistributor);

});

//@description - DELETE distributor
//@route - DELETE /api/distributors/:id
//@access private
const deleteDistributor = asyncHandler(async (req, res) => {


    const distributor = await Distributor.findById(req.params.id);

    if (!distributor) {
        res.status(400);
        throw new Error('Distributor not found');
    }

    //check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged-in user matches the goal user
    if (distributor.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await distributor.remove();
    res.status(200).json({ id: req.params.id });

});

module.exports = {
    getDistributors,
    setDistributor,
    updateDistributor,
    deleteDistributor,
}