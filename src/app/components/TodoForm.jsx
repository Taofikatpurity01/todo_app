"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TodoForm({ initialData, onSubmit }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: initialData?.id || Date.now(), // unique for local todos
      title,
      completed,
      date: new Date().toLocaleDateString(),
      isLocal: true, // mark local-created todos
    };
    onSubmit(newTodo);
    router.push("/"); // redirect back
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl border-none shadow-md space-y-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo..."
        className="w-full border-0 rounded-xl p-2"
        required
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600">
        Save
      </button>
    </form>
  );
}
