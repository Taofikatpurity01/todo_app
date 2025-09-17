import { useState } from "react";

export default function TodoItem({ todo, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.title);

  function handleSave() {
    if (!onUpdate) return; // safeguard
    onUpdate({
      ...todo,
      title: text,
    });
    setIsEditing(false);
  }

  return (
    <div className="flex items-center justify-between p-2 shadow-md bg-[wheat] rounded-lg mb-2">
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 flex-1 mr-2"
        />
      ) : (
        <span>{todo.title}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <button onClick={handleSave} className=" bg-green-500 text-white px-2 py-1 rounded-lg">
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className=" bg-blue-600 text-white px-2 py-1 rounded-lg"
          >
            Edit
          </button>
        )}
        <button onClick={onDelete} className="text-white bg-red-500 px-2 py-1 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
}

