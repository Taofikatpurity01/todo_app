"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "@/app/components/TodoForm";
import { fetchTodo } from "@/lib/api";

export default function TodoDetail({ params }) {
  const [todo, setTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadTodo() {
      const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      const foundLocal = localTodos.find((t) => String(t.id) === params.id);
      if (foundLocal) {
        setTodo(foundLocal);
      } else {
        const apiTodo = await fetchTodo(params.id);
        setTodo({
          ...apiTodo,
          date: new Date().toLocaleDateString(),
        });
      }
    }
    loadTodo();
  }, [params.id]);

  function handleUpdate(updatedTodo) {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    const exists = saved.find((t) => String(t.id) === String(updatedTodo.id));

    let updated;
    if (exists) {
      updated = saved.map((t) =>
        String(t.id) === String(updatedTodo.id) ? updatedTodo : t
      );
    } else {
      updated = [...saved, updatedTodo];
    }

    localStorage.setItem("todos", JSON.stringify(updated));
    router.push("/");
  }

  if (!todo) return <p className="p-4">Loading...</p>;

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <TodoForm initialData={todo} onSubmit={handleUpdate} />
    </main>
  );
}

