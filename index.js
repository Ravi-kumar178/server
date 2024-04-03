const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload")
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const database = require("./config/database");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");



require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connection
database.connect();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir : "/temp/"
    }
));

//cloudinary connect
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//def route
app.get("/",(req,res)=>{
    return res.json({
        success: true,
        message:"Your server is up and running"
    });
})

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`);
})