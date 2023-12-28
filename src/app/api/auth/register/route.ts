import dbConnection from "@/db/connection";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const {name, email, password} = await request.json();
    await dbConnection();
    await User.create({name, email, password});
    return NextResponse.json({msg: "User registred successfully"}, {status: 201});
}