const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'Please add a name']
        },
        email:{
            type:String,
            required: [true, 'Please add an email'],
            unique: true
        },
        password:{
            type:String,
            required: [true, 'Please add a password']
        },
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model('User', userSchema);

//with every goal we have to know which user created that goal
//every goal is associated with a specific user