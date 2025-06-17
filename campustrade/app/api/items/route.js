import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Item from "@/db/schema";
import { connect } from "mongoose";

export async function POST(request) {
    await ConnectDB();

    const body=await request.json();
    const { name, section, item, description, action, image } = body;
    if (!name || !section || !item || !description || !action || !image) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const newItem= await Item.create({
        name,
        section,
        item,
        description,
        action,
        image
    });
    return NextResponse.json({ message: "Item listed successfully!", item: newItem }, { status: 201 });
}
export async function GET(request) {
    await ConnectDB()
    try{

        const items = await Item.find({});
        console.log(items);
        return NextResponse.json(items, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }

    
}