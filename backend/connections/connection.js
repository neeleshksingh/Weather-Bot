const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.set(`strictQuery`, true);
async function getConnection(){
    const uri = process.env.URI
    await mongoose.connect(uri).then(()=>{
        console.log("database connected successfully")
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = getConnection;