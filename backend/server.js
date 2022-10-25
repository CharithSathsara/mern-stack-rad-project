//console.log("Entry point of our application");
//const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');

const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
//app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
//app.use(cors);

app.use('/api/users',require('./routes/userRoutes'));

// Products
app.use('/api/products',require('./routes/productRoutes'));

//distributors
app.use('/api/distributors',require('./routes/distributorRoutes'));

//override the default error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


