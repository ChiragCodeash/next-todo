"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { addTodo } from "../util/function";
import { useRouter } from "next/navigation";

type todo = number | string | null;

const AddInput: React.FC = () => {
  const [todo, setTodo] = useState<todo>();
  const  router  = useRouter()

  const onAddTodo = (): void => {
    if (todo) {
      addTodo(todo);
      setTodo(null);
      router.refresh()
      toast.success("Task Added");

    } else {
      toast.error("Todo is required");

    }
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(e.target.value);
  };
  return (
    <>
      <div className=" flex w-full  gap-2 ">
        {/* <div className=""> */}
          <input
            type="text"
            value={todo || ""}
            onChange={onChangeTodo}
            className="border-2 font-semibold w-full  focus:placeholder:text-black border-gray-300 text-gray-900 text-lg bg-white  focus:border-black focus:ring-0 block  p-4 "
            placeholder="Enter Your Task"
            onKeyUp={(e)=>{if (e.key === 'Enter') {
              onAddTodo()
            }}}
          />
        {/* </div> */}
        <button
          onClick={onAddTodo}
          className="p-4 bg-slate-500 text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default AddInput;
