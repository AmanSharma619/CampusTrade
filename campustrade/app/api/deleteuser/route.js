import { NextResponse } from "next/server";
import { ConnectDB } from "@/db/connection";
import Item from "@/db/schema"
import Service from "@/db/serviceSchema"
import { v2 as cloudinary } from "cloudinary";


