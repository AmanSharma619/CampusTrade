import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Service from "@/db/serviceSchema"

export async function GET(request) {
  await ConnectDB();
  try{

    const services = await Service.find({});
          console.log(services);
          return NextResponse.json(services, { status: 200 });
      } catch (error) {
          console.error("Error fetching items:", error);
          return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
      }
  
}
export async function POST(request) {
  await ConnectDB();
  const body= await request.json();
  const { userID, name, section, description, maxAmount } = body;
  if(!userID || !name || !section || !description || !maxAmount) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
   const NewService = await Service.create({
      userID,
      name,
      section,
      description,
      maxAmount,
    });
    return NextResponse.json({ message: "Service request submitted successfully!", service: NewService }, { status: 201 });
  } catch (error) {
    console.error("Error submitting service request:", error);
    return NextResponse.json({ error: "Failed to submit service request" }, { status: 500 });
  }
}