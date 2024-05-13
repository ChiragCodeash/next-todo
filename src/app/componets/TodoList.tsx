// "use client";
// import React, { useEffect, useState } from "react";
// import SingalCard from "./SingalCard";
// import { getTodo, todoObj } from "../util/function";

// const TodoList: React.FC = () => {
//   const [todoList, setTodoList] = useState<todoObj[] | false>(false);
//   // useEffect(() => {
//   const Todos: todoObj[] | false = getTodo();
//   // setTodoList(Todos);
//   // }, []);
//   return (
//     <>
//       <div>
//         <div className="grid grid-cols-1 lg:grid-cols-2  mt-5 gap-2">
//           {Todos &&
//             Todos.map((item, i) => {
//               return <SingalCard data={item} key={i} />;
//             })}
//         </div>
//         {(!Todos || !Todos.length) && (
//           <h1 className="text-center font-semibold text-lg text-gray-500">NO DATA</h1>
//         )}
//       </div>
//     </>
//   );
// };

// export default TodoList;
import React from "react";
import SingalCard from "./SingalCard";

const fetchTodo = async () => {
  try {
    let response = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });
    response = await response.json();

    return response;
  } catch (error) {
    return false;
  }
};

const TodoList = async () => {
  const Todos : any = await fetchTodo();
  return (
    <>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2  mt-5 gap-2">
          {Todos &&
            Todos.map((item:any, i:any) => {
              return <SingalCard data={item} key={i} />;
            })}
        </div>
        {(!Todos || !Todos.length) && (
          <h1 className="text-center font-semibold text-lg text-gray-500">
            NO DATA
          </h1>
        )}
      </div>
    </>
  );
};

export default TodoList;
