const asyncHandler = require('express-async-handler');
const Income = require('../models/income');


//@description - Get all Income
//@route - GET /api/income
//@access private
const getIncomes = asyncHandler( async (req, res) => {
   
    console.log("getting Income from back end");
    const income = await Income.find({user: req.user.id});
    res.status(200).json(income);
});

//@description - Update income
//@route - POST /api/income
//@access private
const setIncome = asyncHandler (async (req, res) => {

    if(!req.body.description){
        res.status(400);
        throw new Error('Please add a income description field');
    }

    if(!req.body.amount){
        res.status(400);
        throw new Error('Please add a income amount field');
    }

    const income = await Income.create({
        description:req.body.description,
        amount:req.body.amount,
        //relationship
        user: req.user.id,
    })

    res.status(200).json(income);
});

//@description - Update Income
//@route - PUT /api/income/:id
//@access private
const updateIncome = asyncHandler( async (req, res) => {
    //res.status(200).json({msg : `update goal ${req.params.id}`});

    const income = await Income.findById(req.params.id);

    if(!income){
        res.status(400);
        throw new Error('Income not found');
    }

    
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }


    //make sure the logged-in user matches the goal user
    if(income.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedIncome = await Income.findByIdAndUpdate(req.params.id, req.body, {new : true});

    res.status(200).json(updatedIncome);

});

//@description - DELETE product
//@route - DELETE /api/income/:id
//@access private
const deleteIncome = asyncHandler( async (req, res) => {
   

    const income = await Income.findById(req.params.id);

    if(!income){
        res.status(400);
        throw new Error('Income not found');
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged-in user matches the goal user
    if(income.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    await income.remove();
    res.status(200).json({id: req.params.id});

});

module.exports = {
    getIncomes,
    setIncome,
    updateIncome,
    deleteIncome,
}