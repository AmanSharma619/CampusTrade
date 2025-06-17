import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export const ConnectDB = async () => {
    await mongoose.connect(uri).then(()=>{
        console.log("Connected to MongoDB");
        
    })
}