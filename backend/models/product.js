const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
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
        price:{
            type:Number,
            required: [true, 'Please add price']
        },
        quantity:{
            type:Number,
            required: [true, 'Please add quantity']
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Product', productSchema);