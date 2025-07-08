import express from "express";
import cors from "cors";
import chatRoute from "./chatRoute.js"; 
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // 👈 Needed to parse JSON bodies

// Routes
app.use("/chat", chatRoute);
app.get("/", (req, res) => {
  res.send("Welcome to the Chat Server!");  
});
// Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
