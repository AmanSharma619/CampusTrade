import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const uri = process.env.MONGODB_URI;

export const ConnectDB = async () => {
    await mongoose.connect(uri).then(()=>{
        console.log("Connected to MongoDB");
        
    })
}