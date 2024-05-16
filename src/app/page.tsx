import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./common/Loading";
import AddInput from "./(componets)/AddInput";
import TodoList from "./(componets)/TodoList";

const page: React.FC = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  // const cook = cookies().get("authjs.session-token")
  // console.log("🚀 ~ constpage:React.FC= ~ cook:", cook?.value)

  // console.log( await decode({token : cook?.value! , salt: "authjs.session-token" , secret: process.env.AUTH_SECRET!}))
  return (
    <div className="min-h-screen mx-auto container ">
      <div className="px-52 mt-24">
        <AddInput />
        <Suspense fallback={<Loading />}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;