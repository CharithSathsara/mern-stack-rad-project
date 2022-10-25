const mongoose = require('mongoose');

const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connected : ${conn.connection.host}`);
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//We should bring this into server.js and use it.
module.exports = connectDB;