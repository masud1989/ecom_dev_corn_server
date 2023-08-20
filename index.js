const express = require('express');
const { dbConnect } = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Import Routes 
const authRouter = require('./route/authRoutes');
const productRouter = require('./route/productRoutes');
const blogRouter = require('./route/blogRoutes');
const productCategoryRouter = require('./route/productCategoryRoutes');
const blogCategoryRouter = require('./route/blogCategoryRoutes');
const brandRouter = require('./route/brandRoutes');

const port = process.env.PORT || 4000;




//DB Connection
dbConnect();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Apply Routes
app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/productCategory', productCategoryRouter);
app.use('/api/blogCategory', blogCategoryRouter);
app.use('/api/brand', brandRouter);


app.use(notFound);
app.use(errorHandler);


app.listen( port, () => {
    console.log(`Server is running on port: ${port}`)
})