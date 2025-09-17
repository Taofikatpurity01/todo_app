"use client";
import { useEffect, useState } from "react";
import { fetchTodos } from "@/lib/api";
import TodoItem from "@/app/components/TodoItem";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load todos (API + localStorage)
  useEffect(() => {
    async function loadTodos() {
      const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");

      const apiTodos = await fetchTodos();
      const enrichedApiTodos = apiTodos.map((t) => ({
        ...t,
        id: t.id, // keep numeric id
        source: "api", // mark source
        date: new Date().toLocaleDateString(),
      }));

      const enrichedLocalTodos = localTodos.map((t) => ({
        ...t,
        source: "local", // mark source
      }));

      setTodos([...enrichedApiTodos, ...enrichedLocalTodos]);
    }
    loadTodos();
  }, []);

  
  function handleUpdate(updatedTodo) {
    const updatedTodos = todos.map((t) => {
      if (t.id === updatedTodo.id && t.source === updatedTodo.source) {
        return updatedTodo; // replace old with new
      }
      return t;
    });

    setTodos(updatedTodos);

    // keep localStorage in sync (only for local todos)
    localStorage.setItem(
      "todos",
      JSON.stringify(updatedTodos.filter((t) => t.source === "local"))
    );
  }

  // Delete handler
  function handleDelete(id, source) {
    const updated = todos.filter((t) => !(t.id === id && t.source === source));
    setTodos(updated);

    // Only save local todos back
    localStorage.setItem(
      "todos",
      JSON.stringify(updated.filter((t) => t.source === "local"))
    );
  }

  // Counters
  const completedCount = todos.filter((t) => t.completed).length;
  const incompleteCount = todos.filter((t) => !t.completed).length;

  // Filtered list
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "completed") return todo.completed;
    if (activeTab === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <main className="flex min-h-screen">
      {/* Sidebar - md+ only */}
      <div
        className={`hidden md:flex flex-col w-64 bg-[wheat] shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <h2 className="text-xl font-bold p-4 border-b">Filters</h2>
        <nav className="flex flex-col p-2 gap-2">
          <button
            className={`flex justify-between items-center px-3 py-2 rounded-xl ${
              activeTab === "all"
                ? "bg-purple-500 text-white font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("all")}
          >
            <span>All</span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-lg">
              {todos.length}
            </span>
          </button>

          <button
            className={`flex justify-between items-center px-3 py-2 rounded-xl ${
              activeTab === "completed"
                ? "bg-green-500 text-white font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            <span>Completed</span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-lg">
              {completedCount}
            </span>
          </button>

          <button
            className={`flex justify-between items-center px-3 py-2 rounded-xl ${
              activeTab === "incomplete"
                ? "bg-red-500 text-white font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("incomplete")}
          >
            <span>Incomplete</span>
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-lg">
              {incompleteCount}
            </span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Todos</h1>
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle - md+ only */}
            <button
              className="hidden md:block px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <Link
              href="/todos/new"
              className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-600"
            >
              + Add
            </Link>
          </div>
        </div>

        {/* Tabs for Mobile */}
        <div className="flex md:hidden justify-around border-0 bg-white rounded-xl shadow-sm mb-6">
          <button
            className={`flex-1 py-2 rounded-xl ${
              activeTab === "all" ? "bg-blue-500 text-white font-semibold" : ""
            }`}
            onClick={() => setActiveTab("all")}
          >
            All ({todos.length})
          </button>
          <button
            className={`flex-1 py-2 rounded-xl ${
              activeTab === "completed"
                ? "bg-blue-500 text-white font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed ({completedCount})
          </button>
          <button
            className={`flex-1 py-2 rounded-xl ${
              activeTab === "incomplete"
                ? "bg-blue-500 text-white font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("incomplete")}
          >
            Incomplete ({incompleteCount})
          </button>
        </div>

        {/* Todo List */}
        <div>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <TodoItem
                key={`${todo.source}-${todo.id}`} // ✅ unique key
                todo={todo}
                onDelete={() => handleDelete(todo.id, todo.source)}
                onUpdate={handleUpdate} // ✅ pass update handler
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No todos found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
