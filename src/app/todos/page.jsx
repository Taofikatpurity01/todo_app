// app/todos/page.js
import { fetchTodos } from "@/lib/api";
import Link from "next/link";

export default async function TodoListPage() {
 const todos = await fetchTodos(); // Always fresh from server

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Todos</h1>
      <Link
        href="/todos/new"
        className="inline-block mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Todo
      </Link>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <span>{todo.title}</span>
            <div className="space-x-2">
              <Link
                href={`/todos/${todo.id}`}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}


// "use client";
// import { useEffect, useState } from "react";
// import { getTodos, deleteTodo } from "@/lib/api";
// import Link from "next/link";

// export default function TodoListPage() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const data = await getTodos();
//       setTodos(data);
//     }
//     load();
//   }, []);

//   async function handleDelete(id) {
//     const ok = await deleteTodo(id);
//     if (ok) {
//       setTodos((prev) => prev.filter((t) => t.id !== id));
//     }
//   }

//   return (
//     <main className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Todos</h1>
//         <Link
//           href="/todos/new"
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           + Add Todo
//         </Link>
//       </div>

//       <ul className="space-y-3">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className="flex justify-between items-center bg-white p-4 rounded shadow"
//           >
//             <span>{todo.title}</span>
//             <div className="space-x-2">
//               <Link
//                 href={`/todos/${todo.id}`}
//                 className="px-3 py-1 bg-blue-500 text-white rounded"
//               >
//                 Edit
//               </Link>
//               <button
//                 onClick={() => handleDelete(todo.id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }
