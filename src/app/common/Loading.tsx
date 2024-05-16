import React from "react";

const Loading = () => {
  return (
    <>
      <div
        role="status"
        className=" space-y-4  border-gray-200  animate-pulse "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2  mt-5 gap-2">
          <div className={` p-3 h-16  transition-all  bg-slate-100 dark:bg-gray-700 `}></div>
          <div className={` p-3 h-16  transition-all  bg-slate-100 dark:bg-gray-700 `}></div>
          <div className={` p-3 h-16  transition-all  bg-slate-100 dark:bg-gray-700 `}></div>
          <div className={` p-3 h-16  transition-all  bg-slate-100 dark:bg-gray-700 `}></div>
          <div className={` p-3 h-16  transition-all  bg-slate-100 dark:bg-gray-700 `}></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
