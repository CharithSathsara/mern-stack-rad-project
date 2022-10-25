const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            //which object that this object id refers to
            ref: 'User',
        },
        description:{
            type:String,
            required: [true, 'Please add a discription']
        },
        amount:{
            type:Number,
            required: [true, 'Please add amount']
        },
        
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Income', incomeSchema);