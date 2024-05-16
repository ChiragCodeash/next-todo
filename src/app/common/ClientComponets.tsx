"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HandleLogin, HandleLogout, HandleRegistration } from "../util/ServerAction";
import AuthProvidersUi from "./AuthProvidersUi";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface loginData {
  email: string | undefined;
  password: string;
}

interface regData {
  name: string | undefined;
  email: string | undefined;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const inputClasses =
  "dark:bg-gray-900 dark:placeholder:text-gray-100 dark:border-gray-500 dark:text-gray-50 border-2  w-full  focus:placeholder:text-black border-gray-300 text-gray-900  bg-white  focus:border-black focus:ring-0 block  p-3 ";
  const [loginData, setLoginData] = useState<loginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validation = () => {
    if (!loginData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!loginData.password) {
      toast.error("Password is required");
      return false;
    }
    if (loginData.password.length < 8) {
      toast.error("Password minimum length is 8 charaters");
      return false;
    }
    return true;
  };

  const handelLogin = async () => {
    if (validation()) {
      const toastId = toast.loading("Loding...");
      const err = await HandleLogin(loginData);
      if (!err) {
        toast.success("Login Success", {
          id: toastId,
        });
        router.refresh()
      } else {
        toast.error(err, {
          id: toastId,
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" shadow rounded border dark:border-black  w-1/3 flex flex-col">
        <div className=" p-4 border-b dark:text-gray-200  dark:border-black font-semibold text-xl">
          Login and access application
        </div>
        <div className="form flex flex-col gap-6 p-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputClasses}
              placeholder="John@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={inputClasses}
              placeholder="********"
              onChange={handleChange}
            />
          </div>
          <button
            onClick={handelLogin}
            className="bg-gray-600 p-3 text-white font-semibold hover:bg-black transition-all dark:bg-gray-700 dark:text-gray-100"
          >
            Login
          </button>

          <div className="w-full">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
              <div className="absolute px-4 dark:bg-gray-700 dark:text-gray-100 -translate-x-1/2 bg-white left-1/2  font-semibold">
                OR
              </div>
            </div>
            <AuthProvidersUi />
          </div>
        </div>
        <div className=" p-4 border-t text-center dark:border-t-black dark:text-gray-200">
          Don't have an account ?{" "}
          <Link
            href={"/registration"}
            className="border-b cursor-pointer font-semibold"
          >
            Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RegiForm = () => {
  const router = useRouter();
  const inputClasses =
    "dark:bg-gray-900 dark:placeholder:text-gray-100 dark:border-gray-500 dark:text-gray-50  border-2  w-full  focus:placeholder:text-black border-gray-300 text-gray-900  bg-white  focus:border-black focus:ring-0 block  p-3 ";
  const [regData, setRegData] = useState<regData>({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData({ ...regData, [name]: value });
  };

  const validation = () => {
    if (!regData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!regData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!regData.password) {
      toast.error("Password is required");
      return false;
    }
    if (regData.password.length < 8) {
      toast.error("Password minimum length is 8 charaters");
      return false;
    }
    return true;
  };

  const handelRegistration = async () => {
    if (validation()) {
      const response = await HandleRegistration(regData);
      if (response.status) {
        router.push("/login");
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="border min-h-screen flex justify-center items-center ">
      <div className=" shadow rounded border dark:border-black w-1/3 flex flex-col">
        <div className=" p-4 border-b font-semibold text-xl dark:text-gray-200  dark:border-black">
          Create a new account
        </div>
        <div className="form flex flex-col gap-6 p-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={inputClasses}
              placeholder="John"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              className={inputClasses}
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className={inputClasses}
              placeholder="********"
            />
          </div>
          <button
            onClick={handelRegistration}
            className="bg-gray-600 p-3 text-white font-semibold hover:bg-black transition-all"
          >
            Regisration
          </button>

          <div className="w-full">
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
              <div className="absolute px-4 dark:bg-gray-700 dark:text-gray-100  -translate-x-1/2 bg-white left-1/2  font-semibold">
                OR
              </div>
            </div>
            <AuthProvidersUi />
          </div>
        </div>
        <div className=" p-4 border-t text-center dark:border-t-black dark:text-gray-200">
          Already have an account ?{" "}
          <Link
            href={"/login"}
            className="border-b cursor-pointer font-semibold "
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export const LogoutButton = ()=>{
  return <button onClick={HandleLogout} className='p-4 bg-slate-500 text-white font-semibold'>Logout</button>
}