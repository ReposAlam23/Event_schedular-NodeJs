const mongoose = require("mongoose")
const uri = "mongodb://localhost:27017/Event_Schedular"

const conn = async()=>{
    try{
        await mongoose.connect(uri);
        console.log("connection to DB success");
    }catch(e){
        console.log("connection to DB failed", e);
    }
}

module.exports = conn