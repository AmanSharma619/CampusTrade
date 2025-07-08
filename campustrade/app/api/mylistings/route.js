import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Item from "@/db/schema";
import { v2 as cloudinary } from "cloudinary";

// Setup Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(request) {
    await ConnectDB();
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userID');
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
        const items = await Item.find({ userID: userId });
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error("Error fetching user listings:", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
}
export async function DELETE(request) {
  await ConnectDB();
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');

    if (!itemId) {
      return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
    }

    // 1. Find the item by ID
    const item = await Item.findById(itemId);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    if(item.action!="Requested"){

      // 2. Delete the image from Cloudinary
      const publicId = item.imagePublicID; 
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // 3. Delete the item from MongoDB
    await Item.findByIdAndDelete(itemId);

    return NextResponse.json({ message: "Item and image deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
