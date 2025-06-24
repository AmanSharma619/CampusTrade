import mongoose from "mongoose";
const ServiceSchema = new mongoose.Schema({
    userID: String,
    name: String,
    section: String,
    description: String,
    maxAmount: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
