import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: String,
    section: String,
    item: String,
    description: String,
    action: {
        type: String,
        enum: ["Requested", "Selling", "Lending"],
    },
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.models.Item || mongoose.model("Item", ItemSchema);