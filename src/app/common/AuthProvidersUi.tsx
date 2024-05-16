import { signIn } from "@/auth";
import React from "react";
import { HandleGithubLogin } from "../util/ServerAction";

const AuthProvidersUi = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => {
            HandleGithubLogin();
          }}
          className="bg-gray-100 p-3 w-full text-black font-semibold hover:bg-gray-400 transition-all"
        >
          Continue With Github
        </button>
      </div>
    </>
  );
};

export default AuthProvidersUi;
