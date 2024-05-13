"use client";

// import { useRouter } from "next/navigation";

const NAME = "todos";
export type todo = number | string | undefined;

export interface todoObj {
  todo: todo;
  id: number;
  isDone: boolean;
}

// const router = useRouter()

export const addTodo = (todo: todo): void => {
  let isData: string | null = localStorage.getItem(NAME);

  if (isData) {
    const JsonData: todoObj[] = JSON.parse(isData);

    JsonData.push({ todo, id: Date.now(), isDone: false });

    localStorage.setItem(NAME, JSON.stringify(JsonData));
    // router.refresh()
  } else {
    const data: todoObj[] = [
      {
        todo,
        id: Date.now(),
        isDone: false,
      },
    ];

    localStorage.setItem("todos", JSON.stringify(data));
  }
};

export const getTodo = (): todoObj[] | false => {
  const isData: string | null = localStorage.getItem(NAME);
  if (isData) {
    return JSON.parse(isData);
  } else {
    return false;
  }
};

export const deleteTodo = (id: number): boolean => {
  const isData: string | null = localStorage.getItem(NAME);
  if (isData) {
    const parseData: todoObj[] | null = JSON.parse(isData);
    const newData = parseData?.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem(NAME, JSON.stringify(newData));
    return true;
  } else {
    return false;
  }
};

export const updateIsDone = (id: number): boolean => {
  const isData: string | null = localStorage.getItem(NAME);
  if (isData) {
    const parseData: todoObj[] | null = JSON.parse(isData);
    const newData = parseData?.map((item) => {
      return item.id == id ? { ...item, isDone: true } : item;
    });
    localStorage.setItem(NAME, JSON.stringify(newData));
    return true;
  } else {
    return false;
  }
};
