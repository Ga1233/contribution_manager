const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const AuthRouter=require('./Routeslog/AuthRouter');

const contributionrouter=require('./Routeslog/contributionrouter');
require("dotenv").config();
require("./Model/db");
const app=express();


//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/auth',AuthRouter);

app.use('/contribution',contributionrouter);



//DB CONNECTION

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DB Connection Successfull')
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
