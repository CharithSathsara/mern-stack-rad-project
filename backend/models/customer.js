const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            //which object that this object id refers to
            ref: 'User',
        },
        name:{
            type:String,
            required: [true, 'Please add a name']
        },
        address:{
            type:String,
            required: [true, 'Please add the address']
        },
        mobileNumber:{
            type:Number,
            required: [true, 'Please add mobile number']
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Customer', customerSchema);