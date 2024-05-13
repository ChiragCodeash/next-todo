import { Todo } from "@/app/util/Model/todo";
import dbConnect from "@/app/util/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { todo } = await req?.json();
    let sendData;
    if (!todo) {
      sendData = {
        status: false,
        message: "Todo is Rqeuired",
      };
    } else {
      await Todo.create({ isDone: false, todo });
      sendData = {
        status: true,
        message: "Task Added..!",
      };
    }

    return NextResponse.json(sendData);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
