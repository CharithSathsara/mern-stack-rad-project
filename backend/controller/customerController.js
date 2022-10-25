const asyncHandler = require('express-async-handler');
const Customer = require('../models/customer');


//@description - Get all customers
//@route - GET /api/customers
//@access private
const getCustomers = asyncHandler( async (req, res) => {

    console.log("getting customers from back end");
    const customers = await Customer.find({user: req.user.id});
    res.status(200).json(customers);
});

//@description - Update customer
//@route - POST /api/customers
//@access private
const setCustomer = asyncHandler (async (req, res) => {

    if(!req.body.name){
        res.status(400);
        throw new Error('Please add a customer name field');
    }

    if(!req.body.address){
        res.status(400);
        throw new Error('Please add a customer address field');
    }

    if(!req.body.mobileNumber){
        res.status(400);
        throw new Error('Please add a customer mobile number field');
    }

    const customer = await Customer.create({
        name:req.body.name,
        addresss:req.body.address,
        mobileNumber:req.body.mobileNumber,
        //relationship
        user: req.user.id,
    })

    res.status(200).json(customer);
});

//@description - Update customer
//@route - PUT /api/customers/:id
//@access private
const updateCustomer = asyncHandler( async (req, res) => {

    const customer = await Customer.findById(req.params.id);

    if(!customer){
        res.status(400);
        throw new Error('Customer not found');
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }


    //make sure the logged-in user matches the goal user
    if(customer.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new : true});

    res.status(200).json(updatedCustomer);

});

//@description - DELETE customer
//@route - DELETE /api/customers/:id
//@access private
const deleteCustomer = asyncHandler( async (req, res) => {

    const customer = await Customer.findById(req.params.id);

    if(!customer){
        res.status(400);
        throw new Error('Customer not found');
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged-in user matches the goal user
    if(customer.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    await customer.remove();
    res.status(200).json({id: req.params.id});

});

module.exports = {
    getCustomers,
    setCustomer,
    updateCustomer,
    deleteCustomer,
}