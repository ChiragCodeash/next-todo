import React, { Suspense } from "react";
import AddInput from "./componets/AddInput";
import TodoList from "./componets/TodoList";
import Loading from "./common/Loading";

const page: React.FC = () => {
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
