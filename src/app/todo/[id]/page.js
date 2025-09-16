"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation"; // 👈 import router
import TodoForm from "@/app/components/TodoForm";
import { getTodos } from "@/lib/api";

export default function TodoDetail({ params }) {
  const { id } = use(params);
  const [todo, setTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter(); // 👈 initialize router

  useEffect(() => {
    async function fetchTodo() {
      const todos = await getTodos();
      const found = todos.find((t) => t.id === parseInt(id));
      setTodo(found);
    }
    fetchTodo();
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      {isEdit ? (
        <>
          <h1 className="text-2xl mb-4">Edit Todo</h1>
          <TodoForm
            initialData={todo}
            onSubmit={(data) => {
              setTodo(data);

              // 👇 after saving, redirect to home
              router.push("/");
            }}
          />
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-3">{todo.title}</h1>
          <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
          <button
            onClick={() => setIsEdit(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
