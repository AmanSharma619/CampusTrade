import mongoose from "mongoose";

const message = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
        sender: {
            type: String,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
    ,
    {
        timestamps: true
    }
)
export default mongoose.models.Message || mongoose.model("Message", message);