const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const routerServices = require("./Api/serviceAPI")
const routerSignUp = require("./Api/SignUpAPI")
const cors = require("cors")
const cookieParser = require("cookie-parser");
// const db = require("./database/db")
const mongoose = require("mongoose")


dotenv.config({ path: './config.env' });
const app = express();




mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dkingbrandt:gorilla1986@cluster0.9zx9wmx.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({
    orgin: "http://127.0.0.1:3000",
    credentials: true
}))


// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.cookies.jwt);
    next();
});

app.use(routerSignUp);
app.use(routerServices);


const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is listening to port ${port}`)
});
