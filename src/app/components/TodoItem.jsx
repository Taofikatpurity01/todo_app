"use client";
import Link from "next/link";

export default function TodoItem({ todo, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-3">
      <Link href={`/todo/${todo.id}`} className="text-lg">
        {todo.title}
      </Link>
      <div className="flex gap-2">
        <Link
          href={`/todo/${todo.id}?edit=true`}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
