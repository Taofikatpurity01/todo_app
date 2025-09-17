export const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos() {
  const res = await fetch(API_URL + "?_limit=10");
  return res.json();
}

export async function fetchTodo(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createTodo(todo) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function updateTodo(id, todo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
