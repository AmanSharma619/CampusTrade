import express from 'express';
import { ConnectDB } from '../db/connection.js';
import mongoose from 'mongoose';
import Chat from '../db/chatSchema.js';
import Message from '../db/messageSchema.js';
import { get } from 'mongoose';

const router= express.Router()

const chatRoute = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }


  await ConnectDB();

  try {
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // 1. Create chat if not exists
    if (!chat) {
      const sortedParticipants = [senderId, receiverId].sort();
      chat = new Chat({
        participants: sortedParticipants,
        lastMessage: null
      });
      await chat.save();
    }

    // 2. Create and save message with chatId
    const newMessage = new Message({
      chatId: chat._id,
      sender: senderId,
      content: message
    });
    await newMessage.save();

    // 3. Update chat with lastMessage
    chat.lastMessage = newMessage._id;
    await chat.save();

    return res.status(200).json({
      message: "Message sent successfully",
      chatId: chat._id,
      messageId: newMessage._id
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const checkChat = async (req, res) => {
  const [senderId, receiverId] = [req.query.senderId, req.query.receiverId];
  if (!senderId || !receiverId) {
    return res.status(400).json({ error: "Both senderId and receiverId are required" });
  }
  await ConnectDB();
  try {
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (chat) {
      return res.status(200).json({ exists: true, chatId: chat._id });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function getChat(req, res) {
  const chatId = req.query.chatId;
  if (!chatId) {
    return res.status(400).json({ error: "chatId is required" });
  }
  
  await ConnectDB();
  
  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    
    if (messages.length === 0) {
      return res.status(404).json({ error: "No messages found for this chat" });
    }
    
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function saveChat(req, res) {
  const { chatId, senderId, message } = req.body;
  
  if (!chatId || !senderId  || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  await ConnectDB();

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const newMessage = new Message({
      chatId,
      sender: senderId,
      content: message
    });

    await newMessage.save();

    chat.lastMessage = newMessage._id;
    await chat.save();

    return res.status(200).json({
      message: "Message saved successfully",
      messageId: newMessage._id
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
}

async function newChat(req, res) {
  const { senderId, receiverId, message } = req.body;
  console.log("Received request body:", req.body);
  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }


  await ConnectDB();

  try {
    // 1. Create chat 
    
      const sortedParticipants = [senderId, receiverId].sort();
      const chat = new Chat({
        participants: sortedParticipants,
        lastMessage: null
      });
      await chat.save();
    

    // 2. Create and save message with chatId
    const newMessage = new Message({
      chatId: chat._id,
      sender: senderId,
      content: message
    });
    await newMessage.save();

    // 3. Update chat with lastMessage
    chat.lastMessage = newMessage._id;
    await chat.save();

    return res.status(200).json({
      message: "Message sent successfully",
      chatId: chat._id,
      messageId: newMessage._id
    });

  } catch (error) {
    console.error("🔥 Error in /chat/newchat:", error);
    return res.status(500).json({ error: error.message });
  }
}

const getRecentChats = async (req, res) => {
  const userId = req.query.userId;
  await ConnectDB();
  try {
    const chats = await Chat.find({ participants: userId });

const formattedChats = await Promise.all(
  chats.map(async (chat) => {
    const otherUserId = chat.participants.find((id) => id !== userId);

    let lastMessageData = null;
    let lastTimestamp = null;

    if (chat.lastMessage) {
      const message = await Message.findById(chat.lastMessage);
      if (message) {
        lastMessageData = {
          content: message.content,
          timestamp: message.timestamp, // assuming timestamps are enabled
        };
        lastTimestamp = message.timestamp;
      }
    }

    return {
      chatId: chat._id,
      otherUserId,
      lastMessage: lastMessageData,
      lastTimestamp, // 👈 we'll sort using this
    };
  })
);

// ✅ Now sort by lastTimestamp descending (most recent first)
formattedChats.sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));

res.status(200).json(formattedChats);

  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
router.get("/checkchat",checkChat)
router.post('/', chatRoute);
router.get('/getchat',getChat);
router.post('/savechat',saveChat);
router.post('/newchat', newChat);
router.get('/recentchats',getRecentChats);

export default router;