
import React from "react";
import { deleteTodo, todoObj, updateIsDone } from "../util/function";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface SingalCardProps {
  data: todoObj
}



const SingalCard: React.FC<SingalCardProps> = ({data}) => {
  const router = useRouter()

  const handelDelete = (id : number)=>{
    deleteTodo(id)
    toast.success("Task Deleted...!")
    router.refresh()
  }
  const handelEdit = (id : number)=>{
    updateIsDone(id)
    toast.success("Task Updated...!")
    router.refresh()
  }
  return (
    <>
      <div className={`flex justify-between items-center align-middle p-3 cursor-pointer transition-all border-2 hover:border-black ${data.isDone ? "border-green-500" : "border-red-600"}`}>
        <h3 className="w-80">{data.todo}</h3>
        <div className="flex gap-2">
          <button className="bg-gray-300 text-black text-sm p-2 transition-all  hover:scale-90 disabled:cursor-not-allowed disabled:opacity-60" title="Mark as done" disabled={data.isDone} onClick={()=>{handelEdit(data.id)}}>
            <IconCircleCheck/>
          </button>
          <button className="bg-red-300 text-black text-sm p-2 transition-all  hover:scale-90" title="Delete" onClick={()=>{handelDelete(data.id)}}><IconTrash/></button>
        </div>
      </div>
    </>
  );
};

export default SingalCard;

export const IconCircleCheck = () => {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  );
};

export const IconTrash = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 7l16 0" />
  <path d="M10 11l0 6" />
  <path d="M14 11l0 6" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>
  );
};
