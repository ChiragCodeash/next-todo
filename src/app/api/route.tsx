import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import dbConnect from "../util/db";

export async function GET(request:NextApiRequest) {
    await dbConnect()
    return NextResponse.json({name : "Chirag"});
}