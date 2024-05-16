"use client";
import { usePathname } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { HandleLogout } from "../util/ServerAction";
import toast from "react-hot-toast";
import { Context } from "../context/ContextProvider";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  // const [darkMode , setDarkMode] = useState((localStorage.getItem("darkMode")) || false)
  const pathname = usePathname();
  const { toggleDarkMode , darkMode} = useContext<any>(Context)

  // useEffect(() => {
  //   const isDarkMode = localStorage.getItem('darkMode') === 'true';
  //   setDarkMode(isDarkMode);
  // }, []);

  // useEffect(()=>{
  //   localStorage.setItem('darkMode', String(darkMode));
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // },[darkMode])

  // const toggleDarkMode = () => {
  //   setDarkMode(prevMode => !prevMode);
  // };

  if (!["/login", "/registration"].includes(pathname)) {
    return (
      <>
        <nav className=" bg-gray-100 p-5 dark:bg-gray-900 dark:text-gray-100">
          <div className="container mx-auto px-52 flex justify-between items-center ">
            <h1 className="font-semibold text-3xl hover:scale-90 transition-all cursor-pointer">
              TODO.
            </h1>
            <div className="flex gap-4 items-center">
              {children}
              {
                darkMode ? 
              <button onClick={toggleDarkMode} className="text-blue-300 hover:scale-90 transition-all">
                <IconDarkMode  />
              </button> : 

              <button onClick={toggleDarkMode} className="text-blue-300 hover:scale-90 ">
                <IconLightMode />
              </button>
              }
              <button
                className="p-4 bg-slate-500 text-white font-semibold dark:bg-gray-700 dark:text-gray-100"
                onClick={async () => {
                  const toastId = toast.loading("Loding...");
                  await HandleLogout();
                  toast.success("Logout Success", {
                    id: toastId,
                  });
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

const IconDarkMode = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-moon-stars"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
      <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
      <path d="M19 11h2m-1 -1v2" />
    </svg>
  );
};
const IconLightMode = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-sun text-blue-900"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
  );
};

export default Header;
