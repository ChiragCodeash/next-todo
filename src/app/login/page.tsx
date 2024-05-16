
import { auth } from "@/auth";
import {LoginForm} from "../common/ClientComponets";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


const Login = async() => {
  const session = await auth()
  if(session?.user) redirect("/")

  
  return (
    <>
      <LoginForm/>
    </>
  );
};

export default Login;
