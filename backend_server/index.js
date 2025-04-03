const express = require('express');
const expFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const cors = require('cors');


// get port from .env
const PORT = process.env.PORT || 8080;

// add parsing middlewares
app.use(express.json());
app.use(cookieParser());
app.use( // for frontend req on another port 
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)
app.use(expFileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// DB connection
const dbConnect = require('./config/database.js');
dbConnect();

// cloudinary connection
const cloudinaryConnect = require('./config/cloudinary.js');
cloudinaryConnect();

// import route and mount api
const userRoute = require('./routes/userRoute.js');
const courseRoute = require('./routes/courseRoute.js');
const profileRoute = require('./routes/profileRoute.js');
const paymentRoute = require('./routes/paymentRoute.js')
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/courses",courseRoute);
app.use("/api/v1/payment",paymentRoute);

// start server
app.listen(PORT,() => {
    console.log(`APP is running successfully at ${PORT}`);
})

// console.log("Testing is On with time")
// default route
app.get("/",(req ,res) => {
    return res.status(200).json({
        success:true,
        message:"Server is up and running"
    })
})

