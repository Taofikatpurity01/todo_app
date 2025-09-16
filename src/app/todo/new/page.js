"use client";
import { createTodo } from "@/lib/api";
import { useRouter } from "next/navigation";
import TodoForm from "@/app/components/TodoForm";

export default function NewTodoPage() {
  const router = useRouter();

  const handleSubmit = async (todo) => {
    await createTodo(todo);
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl mb-4">Add Todo</h1>
      <TodoForm onSubmit={handleSubmit} />
    </div>
  );
}
