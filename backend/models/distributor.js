const mongoose = require('mongoose');

const distributorSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            //which object that this object id refers to
            ref: 'User',
        },
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        product: {
            type: String,
            required: [true, 'Please add product']
        },
        address: {
            type: String,
            required: [true, 'Please add Address']
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Distributor', distributorSchema);