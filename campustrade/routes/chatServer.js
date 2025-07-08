import express from "express";
import cors from "cors";
import {createServer} from "http"
import {Server} from "socket.io"
import chatRoute from "./chatRoute.js"; 
const app = express();
const httpServer = createServer(app)
// Middlewares
app.use(cors());
app.use(express.json()); // 👈 Needed to parse JSON bodies

// Routes
app.use("/chat", chatRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the Chat Server!");  
});

const io= new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Adjust this to your client URL
    methods: ["GET", "POST"],
  },
});
io.on("connection",(socket)=>{
  console.log(`New socket connected : ${socket.id}`);

  socket.on("joinChat", (data) => {
  socket.join(data.chatId); // ✅ Join the room
  console.log(`User ${data.userId} joined room ${data.chatId}`);
});
  socket.on("sendMessage", (data) => {
    console.log(`Message sent in chat ${data.chatId} by ${data.senderId}: ${data.content}`);
    // Broadcast the message to the room
    io.to(data.chatId).emit("receiveMessage", {
      chatId: data.chatId,
      senderId: data.senderId,
      content: data.content,
      timestamp: data.timestamp,
    });
  });
  
})
// Server
httpServer.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
