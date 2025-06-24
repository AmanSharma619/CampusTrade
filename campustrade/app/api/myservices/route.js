import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Service from "@/db/serviceSchema";

export async function GET(request) { 
    await ConnectDB();
    try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if(!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
     const services = await Service.find({ userID: userId });
            return NextResponse.json(services, { status: 200 });
      
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
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

    
    const item = await Service.findById(itemId);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    await Service.findByIdAndDelete(itemId);

    return NextResponse.json({ message: "Item and image deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
