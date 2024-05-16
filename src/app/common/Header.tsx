"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { HandleLogout } from "../util/ServerAction";
import toast from "react-hot-toast";

interface HeaderProps {
  children : React.ReactNode
}

const Header: React.FC<HeaderProps> = ({children}) => {
  const pathname = usePathname();
  if (!["/login", "/registration"].includes(pathname)) {
    return (
      <>
        <nav className=" bg-gray-100 p-5">
          <div className="container mx-auto px-52 flex justify-between items-center ">
            <h1 className="font-semibold text-3xl hover:scale-90 transition-all cursor-pointer">
              TODO.
            </h1>
            <div className="flex gap-4 items-center">
              {children}

              <button
                className="p-4 bg-slate-500 text-white font-semibold "
                onClick={async() => {
                  const toastId = toast.loading("Loding...")
                  await HandleLogout();
                    toast.success("Logout Success", {
                      id: toastId
                    })
                  
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return <></>;
  }
};

export default Header;
