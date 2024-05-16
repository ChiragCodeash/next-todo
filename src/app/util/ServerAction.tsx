"use server";

import { signIn, signOut } from "@/auth";
import { hash } from "bcryptjs";
import { User } from "./Model/user";
import dbConnect from "./db";

interface regData {
  name: string | undefined;
  email: string | undefined;
  password: string;
}
interface loginData {
  email: string | undefined;
  password: string;
}

export const HandleRegistration = async (data: regData) => {
  const { email, password, name } = data;

  await dbConnect();

  const isUserExits = await User.findOne({ email });
  if (isUserExits) {
    return {
      status: false,
      message: "User Already exits",
    };
  }
  const hashPassword = await hash(password, 10);
  const user = User.create({
    name,
    email,
    password: hashPassword,
  });
  return {
    status: true,
    message: "User Created Succfull...!",
  };
};

export const HandleLogin = async (data: loginData) => {
  const { email, password } = data;

  try {
    const data = await signIn("credentials", {
      password,
      email,
    });
  } catch (error: any) {
    return error.cause;
    // }
  }
};

export const HandleGithubLogin = async () => {
  await signIn("github");
};
export const HandleLogout = async () => {
  // try {
    await signOut({ redirect: true, redirectTo: "/login" });
    return true
    // return true
  // } catch (error) {
  //   return false
  // }
};
