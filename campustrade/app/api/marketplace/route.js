import { NextResponse } from "next/server";
export async function GET(){
    console.log("aman sharma");
    
    return NextResponse.json({success:true,name:"hello"})
    
}