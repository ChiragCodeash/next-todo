import { auth } from "@/auth";
import { RegiForm } from "../common/ClientComponets";
import { redirect } from "next/navigation";


const Registration =async () => {
  const session = await auth()
  if(session?.user) redirect("/")
  return (
    <>
      <RegiForm/>
    </>
  );
};

export default Registration;
