import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  participants: [
    { type:String, ref: 'User' }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
});

chatSchema.index({ participants: 1 }); 
export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);