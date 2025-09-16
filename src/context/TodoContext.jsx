"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getTodos } from "@/lib/api";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getTodos();
      setTodos(data.slice(0, 10)); // fetch some todos initially
    }
    fetchData();
  }, []);

  const addTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (updated) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
