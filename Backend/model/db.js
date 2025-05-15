const mongoose=require("mongoose");

const mongo_url=process.env.DB_CONNECTION;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("MongoDB Connected")
    }).catch((err)=>{
        console.log('MongoDB Connection Failed',err);
    })
