import mongoose from "mongoose";
import { act } from "react";

const today = new Date();
const formatted = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).format(today);

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
        default: formatted,
    },
})
export default mongoose.models.Item || mongoose.model("Item", ItemSchema);