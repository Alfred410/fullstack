import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodo = async () => {
    const res = await fetch(`/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch(`/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });
    setNewTodo("");
    fetchTodo();
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodo();
  };

  const deleteTodo = async (id) => {
    await fetch(`/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodo();
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <div className="bg-white p-3">
        <h1 className="text-black mb-3">ToDo List</h1>

        <div className="flex gap-5">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add task"
            className="border text-black"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((todo, todoIndex) => (
            <li key={todoIndex} className="flex justify-between gap-3">
              <div className="flex">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />

                <span className="text-black">{todo.title}</span>
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="bg-red">
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
