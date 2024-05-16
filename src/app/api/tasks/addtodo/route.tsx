import { Todo } from "@/app/util/Model/todo";
import { User } from "@/app/util/Model/user";
import dbConnect from "@/app/util/db";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { todo, user_id } = await req?.json();
    let sendData;
    if (!todo) {
      sendData = {
        status: false,
        message: "Todo and UserID  is Rqeuired",
      };
    } else {
      const cook = cookies().get("authjs.session-token")
      const LoginUserData = await decode({token : cook?.value! , salt: "authjs.session-token" , secret: process.env.AUTH_SECRET!})
      // console.log(LoginUserData)
      const { _id } = await User.findOne({ email: LoginUserData?.email! });
      await Todo.create({ isDone: false, todo, user_id: _id });
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
