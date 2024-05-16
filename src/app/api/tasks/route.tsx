import { Todo } from "@/app/util/Model/todo";
import { User } from "@/app/util/Model/user";
import dbConnect from "@/app/util/db";
import { NextApiRequest } from "next";
import { decode } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest  ) {
  await dbConnect();
  const authorization = headers().get("authorization")
// console.log(authorization)
  const userData =  await decode({token : authorization! , salt: "authjs.session-token" , secret: process.env.AUTH_SECRET!})
  const {_id} = await User.findOne({email : userData?.email})


  const data: any = await Todo.find({user_id : _id});
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  try {
    let sendData;
    if (!id) {
      sendData = {
        status: false,
        message: "ID is Rqeuired",
      };
    } else {
      const isExits = await Todo.findById(id);
      if (isExits) {
        await Todo.findByIdAndDelete(id);
        sendData = {
          status: true,
          message: "Task Deleted",
        };
      } else {
        sendData = {
          status: false,
          message: "Task does not exits",
        };
      }
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

export async function PUT(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  try {
    let sendData;
    if (!id) {
      sendData = {
        status: false,
        message: "ID is Rqeuired",
      };
    } else {
      const isExits = await Todo.findById(id);
      if (isExits) {
        await Todo.findByIdAndUpdate(id, { isDone: true });
        sendData = {
          status: true,
          message: "Task Updated",
        };
      } else {
        sendData = {
          status: false,
          message: "Task does not exits",
        };
      }
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
