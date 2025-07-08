import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Item from "@/db/schema"
import Service from "@/db/serviceSchema"
import Chat from "@/db/chatSchema"
import Message from "@/db/messageSchema"
import { v2 as cloudinary } from "cloudinary";
import { connect } from "mongoose";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function DELETE(request) {
  await ConnectDB();
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userID');

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Delete cloudinary photos of items listed by the user
    const items = await Item.find({ userID: userId });
    for (const item of items) {
      if (item.imagePublicID && item.imagePublicID !== "requested") {
        await cloudinary.uploader.destroy(item.imagePublicID);
      }
    }

    // Delete items and services listed by the user
    await Item.deleteMany({ userID: userId });
    await Service.deleteMany({ userID: userId });

    // Find chats involving the user
    const chats = await Chat.find({ participants: userId });
    const chatIds = chats.map(chat => chat._id);

    // Delete all messages in those chats
    await Message.deleteMany({ chatId: { $in: chatIds } });

    // Delete chats involving the user
    await Chat.deleteMany({ participants: userId });

    return NextResponse.json({ message: "User and associated data deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



