const asyncHandler = require('express-async-handler');
const Product = require('../models/product');


//@description - Get all products
//@route - GET /api/products
//@access private
const getProducts = asyncHandler( async (req, res) => {
    //res.status(200).json({msg : 'get Goals'});
    //get only specific users goals
    //remember we have user field on the goal which is a relationship to the user model
    console.log("getting products from back end");
    const products = await Product.find({user: req.user.id});
    console.log(" Get Products " + products)
    res.status(200).json(products);
});

//@description - Update product
//@route - POST /api/products
//@access private
const setProduct = asyncHandler (async (req, res) => {

    console.log("Creating Product");
    if(!req.body.name){
        console.log("Please add a product name field");
        //400 bad request
        //res.status(400).json({msg : 'please add a text field'}) => but better we can use the express error handler...because it have built in error handler.
        res.status(400);
        throw new Error('Please add a product name field');
    }

    if(!req.body.price){
        console.log("Please add a product name field");
        res.status(400);
        throw new Error('Please add a product price field');
    }

    if(!req.body.quantity){
        console.log("Please add a product name field");
        res.status(400);
        throw new Error('Please add a product quantity field');
    }

    const product = await Product.create({
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity,
        //relationship
        user: req.user.id,
    })

    console.log("PRODUCT " + product)

    res.status(200).json(product);
});

//@description - Update product
//@route - PUT /api/products/:id
//@access private
const updateProduct = asyncHandler( async (req, res) => {
    //res.status(200).json({msg : `update goal ${req.params.id}`});

    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(400);
        throw new Error('Product not found');
    }

    //const user = await User.findById(req.user.id);

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }


    //make sure the logged-in user matches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new : true});

    res.status(200).json(updatedProduct);

});

//@description - DELETE product
//@route - DELETE /api/products/:id
//@access private
const deleteProduct = asyncHandler( async (req, res) => {
    //res.status(200).json({msg : `delete goal ${req.params.id}`});

    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(400);
        throw new Error('Product not found');
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged-in user matches the goal user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized')
    }

    await product.remove();
    res.status(200).json({id: req.params.id});

});

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
}