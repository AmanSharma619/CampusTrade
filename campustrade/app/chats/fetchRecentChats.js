import React from "react";

export async function getRecentChats(userID, firebase) {
  try {
    const res = await fetch(`http://localhost:5000/chat/recentchats?userId=${userID}`);
    const data = await res.json();

    const enrichedChats = await Promise.all(
      data.map(async (chat) => {
        const id = chat.otherUserId;
        const user = await firebase.getUserByUID(id);
        return {
          chatId: chat.chatId,
          lastMessage: chat.lastMessage,
          otherUserId: id,
          otherUserName: user?.Name || "Unknown"
        };
      })
    );

    return enrichedChats;
  } catch (err) {
    console.error("Error in getRecentChats:", err);
    return [];
  }
}
