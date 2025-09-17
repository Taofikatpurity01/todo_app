"use client";
import TodoForm from "@/app/components/TodoForm";

export default function NewTodo() {
  function handleCreate(newTodo) {
    const saved = JSON.parse(localStorage.getItem("todos") || "[]");
    const updated = [...saved, newTodo];
    localStorage.setItem("todos", JSON.stringify(updated));
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Todo</h1>
      <TodoForm onSubmit={handleCreate} />
    </main>
  );
}


