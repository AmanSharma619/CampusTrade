import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://amansharmaas536:amansharma9@cluster0.zebzhiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const ConnectDB = async () => {
    await mongoose.connect(MONGODB_URI).then(()=>{
        console.log("Connected to MongoDB");
        
    })
}