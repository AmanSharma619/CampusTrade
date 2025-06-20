import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    userID: String,
    name: String,
    section: String,
    item: String,
    description: String,
    action: {
        type: String,
        enum: ["Requested", "Selling", "Lending"],
    },
    image: String,
    imagePublicID: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.models.Item || mongoose.model("Item", ItemSchema);