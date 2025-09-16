"use client";
import { useState } from "react";

export default function TodoForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) onSubmit({ ...initialData, title });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <input
        type="text"
        placeholder="Enter todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
}
