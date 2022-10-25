const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');//hash our passwords
const asyncHandler = require('express-async-handler');//handle the exceptions
const User = require('../models/user');

//@description - Register new user
//@route - POST /api/users
//@access public
const registerUser = asyncHandler (async (req, res) => {

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please add all fields');
    }

    //check if user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    //hash the password
    const salt = await  bcrypt.genSalt(10);
    //password = plain text password which comes from html form
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });

    //if user is created
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

    //dan meka oni naa
    //res.json({message:'Register User'})
})

//@description - Authenticate a user
//@route - POST /api/login
//@access public
const loginUser = asyncHandler (async (req, res) => {

    const {email, password } = req.body;

    //check for user email
    const user = await  User.findOne({email});

    //password => which comes from html form...
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
    //res.json({message:'Login User'})
})

//@description - Get user data
//@route - GET /api/users/me
//@access private
const getMe = asyncHandler( async (req, res) => {
    //res.json({message:'User data display'});
    //req.user is a user who is authenticated
    //const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json(req.user)

})//get current login user because we will be sending a token and we get id from that token

//Generate a JWT
//this function get an id. that is the user id. => we put that as the payload
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    });
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}